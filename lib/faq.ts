// Frequently asked questions. Answers use only what is on the packaging and in
// the brand brief, and stay within the claims rules: scalp care and
// healthier-looking, softer, smoother hair. Nothing here promises less
// shedding, regrowth, or treatment of hair loss.
export type FaqItem = {
  question: string;
  answer: string;
  // Not a real answer yet: shown to visitors as "coming soon" wording and left
  // out of the search-engine data.
  placeholder?: boolean;
};

export const HOME_FAQ: FaqItem[] = [
  {
    question: "Who is Komb for?",
    answer:
      "Komb is made with women in their 30s and 40s in mind, whose hair is changing, often around postpartum or perimenopause. Both products are suitable for all hair types.",
  },
  {
    question: "Which step comes first?",
    answer:
      "Start with the Botanical Hair Serum. Apply a few drops to the scalp, massage gently, and leave it on for at least 30 minutes, or overnight, before washing. Then use the Renewal Hair Moisturizer through your lengths, on wet or dry hair, and style as usual.",
  },
  {
    question: "What results can I expect?",
    answer:
      "A scalp that feels nourished, and lengths that feel hydrated, softer, smoother and easier to manage. Komb is cosmetic scalp and haircare. It is not a hair loss treatment, and we do not promise less shedding or regrowth.",
  },
  {
    question: "Will it regrow my hair or stop shedding?",
    answer:
      "We do not make that promise. Komb is cosmetic scalp and haircare: the serum nourishes the scalp and hair, and the moisturizer hydrates the lengths. Neither is a treatment for hair loss. If you are worried about hair loss, it is worth speaking with your doctor.",
  },
  {
    question: "What is in the products?",
    answer:
      "The serum is a blend of nine botanical oils, including avocado, jojoba, rosemary and juniper berry. The moisturizer combines mango and shea butters and plant oils with conditioning ingredients, including silicones and fragrance. Every ingredient is listed in full on each product page and on the packaging, in English and French.",
  },
  {
    question: "Where is Komb made?",
    answer:
      "Our products are made in the USA and distributed by Komb Hair Inc. in Woodbridge, Ontario, Canada.",
  },
  {
    question: "Where do you ship, and how long does it take?",
    answer:
      "We are finalising our shipping details and will post them here before we open for orders.",
    placeholder: true,
  },
  {
    question: "What is your return policy?",
    answer:
      "We are finalising our return policy and will post it here before we open for orders.",
    placeholder: true,
  },
];

export const PRODUCT_FAQ: Record<string, FaqItem[]> = {
  "botanical-hair-serum": [
    {
      question: "How do I use the Botanical Hair Serum?",
      answer:
        "Apply a few drops directly to the scalp, focusing on targeted areas, and gently massage it in.",
    },
    {
      question: "How long should I leave it on?",
      answer:
        "Leave it on for at least 30 minutes before washing. For a more intensive treatment, leave it on overnight and wash in the morning.",
    },
    {
      question: "Is it suitable for my hair type and scalp?",
      answer:
        "The serum is for all hair types. It is for external use only: avoid contact with the eyes, and stop using it if irritation occurs. If your scalp is sensitive, try a small amount first.",
    },
    {
      question: "Will it regrow my hair or stop shedding?",
      answer:
        "We do not make that promise. The serum is a cosmetic scalp care product that nourishes the scalp and hair. It is not a treatment for hair loss. If you are worried about hair loss, it is worth speaking with your doctor.",
    },
    {
      question: "Can I use it with the Renewal Hair Moisturizer?",
      answer:
        "Yes. They are made as a two-step routine: the serum for the scalp first, then the moisturizer through the lengths.",
    },
    {
      question: "How long does it keep once opened?",
      answer: "Use it within 6 months of opening.",
    },
  ],
  "renewal-hair-moisturizer": [
    {
      question: "How do I use the Renewal Hair Moisturizer?",
      answer:
        "Apply it to wet or dry hair, working section by section. Massage it evenly through the hair, then style as you like.",
    },
    {
      question: "Do I rinse it out?",
      answer: "No. It is a leave-in moisturizer: work it through the hair and style as desired.",
    },
    {
      question: "Does it contain silicones or fragrance?",
      answer:
        "Yes, both. It contains conditioning silicones (cyclomethicone and dimethicone) and fragrance, alongside mango and shea butters and plant oils. The full list is under Full ingredients above.",
    },
    {
      question: "Does it contain nuts?",
      answer:
        "Yes. It contains sweet almond oil and almond oil, which come from a tree nut. If you have a tree nut allergy, check with your doctor before using it.",
    },
    {
      question: "Is it suitable for my hair type?",
      answer:
        "It is for all hair types. It is for external use only: avoid contact with the eyes, and stop using it if irritation occurs.",
    },
    {
      question: "Can I use it with the Botanical Hair Serum?",
      answer:
        "Yes. They are made as a two-step routine: the serum for the scalp first, then the moisturizer through the lengths.",
    },
    {
      question: "How long does it keep once opened?",
      answer: "Use it within 6 months of opening.",
    },
  ],
};
