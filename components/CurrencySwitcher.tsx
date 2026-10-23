"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";

const OPTIONS = [
  { country: "CA", label: "Canada (CAD $)" },
  { country: "US", label: "United States (USD $)" },
];
const COOKIE = "komb-country";

// Lets visitors pick their country, and with it the currency, when the
// automatic location guess is wrong. The choice is kept in a cookie that the
// server reads to ask Shopify Markets for that country's prices. Until the
// store is connected, prices stay in USD whichever is chosen.
export function CurrencySwitcher() {
  const router = useRouter();
  const id = useId();
  const [value, setValue] = useState("");

  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )komb-country=([A-Z]{2})/);
    if (match) setValue(match[1]);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="whitespace-nowrap">
        Country
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          document.cookie = `${COOKIE}=${e.target.value}; path=/; max-age=31536000; samesite=lax`;
          router.refresh();
        }}
        className="min-h-9 appearance-none border border-offwhite/50 bg-umber bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2012%208%22%20fill=%22none%22%20stroke=%22%23f7f2e9%22%20stroke-width=%221.5%22%3E%3Cpath%20d=%22M1%201.5l5%205%205-5%22/%3E%3C/svg%3E')] bg-size-[0.65rem] bg-position-[right_0.7rem_center] bg-no-repeat pr-8 pl-2.5 text-offwhite"
      >
        <option value="" disabled>
          Automatic
        </option>
        {OPTIONS.map((o) => (
          <option key={o.country} value={o.country}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
