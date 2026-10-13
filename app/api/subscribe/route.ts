import { NextResponse } from "next/server";

// The one place the email sign-up talks to a provider, so the provider can be
// swapped without touching the form. Order of preference:
//   1. Klaviyo, when KLAVIYO_PRIVATE_API_KEY and KLAVIYO_LIST_ID are set.
//   2. Shopify (customer with email-marketing consent), when
//      SHOPIFY_ADMIN_ACCESS_TOKEN is set alongside SHOPIFY_STORE_DOMAIN.
//   3. Neither: a preview reply. Nothing is stored or sent anywhere.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function viaKlaviyo(email: string) {
  const res = await fetch("https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs", {
    method: "POST",
    headers: {
      Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_API_KEY}`,
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
      revision: process.env.KLAVIYO_API_REVISION ?? "2025-07-15",
    },
    body: JSON.stringify({
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          custom_source: "Website footer",
          profiles: {
            data: [
              {
                type: "profile",
                attributes: {
                  email,
                  subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } },
                },
              },
            ],
          },
        },
        relationships: { list: { data: { type: "list", id: process.env.KLAVIYO_LIST_ID } } },
      },
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Klaviyo responded ${res.status}`);
}

async function viaShopify(email: string) {
  const version = process.env.SHOPIFY_API_VERSION ?? "2026-07";
  const res = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/${version}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query: `mutation Subscribe($input: CustomerInput!) {
          customerCreate(input: $input) { customer { id } userErrors { field message } }
        }`,
        variables: {
          input: {
            email,
            emailMarketingConsent: {
              marketingState: "SUBSCRIBED",
              marketingOptInLevel: "SINGLE_OPT_IN",
            },
          },
        },
      }),
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error(`Shopify Admin API responded ${res.status}`);
  const json = await res.json();
  const errors: { message: string }[] = json.data?.customerCreate?.userErrors ?? [];
  // Someone already on the list is not an error from the visitor's side.
  if (errors.length && !errors.some((e) => /taken/i.test(e.message))) {
    throw new Error(errors[0].message);
  }
  if (json.errors?.length) throw new Error(json.errors[0].message);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    if (process.env.KLAVIYO_PRIVATE_API_KEY && process.env.KLAVIYO_LIST_ID) {
      await viaKlaviyo(email);
    } else if (process.env.SHOPIFY_ADMIN_ACCESS_TOKEN && process.env.SHOPIFY_STORE_DOMAIN) {
      await viaShopify(email);
    } else {
      return NextResponse.json({ ok: true, preview: true });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "We couldn't sign you up just now. Please try again." },
      { status: 502 }
    );
  }
}
