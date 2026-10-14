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
      "Komb is created for women navigating changes in their hair, through postpartum, perimenopause, and the changes that come with age, when hair feels thinner, drier, or simply different than it used to.",
  },
  {
    question: "Which step comes first?",
    answer:
      "Start with the Botanical Hair Serum. Apply a few drops to the scalp, massage gently, and leave it on for at least 30 minutes, or overnight, before washing. Then use the Renewal Hair Moisturizer through your lengths, on wet or dry hair, and style as usual.",
  },
  {
    question: "What results can I expect?",
    answer:
      "A scalp that feels nourished, and lengths that feel hydrated, softer, smoother and easier to manage.",
  },
  {
    question: "What is in the products?",
    answer:
      "The serum is a blend of ten botanical oils, including pumpkin seed, rosemary, juniper berry, avocado and jojoba. The moisturizer combines mango and shea butters and plant oils with conditioning ingredients, including silicones and fragrance. Every ingredient is listed in full on each product page and on the packaging.",
  },
  {
    question: "What if I have allergies or sensitive skin?",
    answer:
      "Please review the full ingredient list before using any Komb product, and avoid products containing ingredients you\u2019re allergic to. Our Renewal Hair Moisturizer contains sweet almond oil, so it may not be suitable for those with an almond or tree nut allergy. We recommend testing a small amount on a small area of skin before first use. If you experience redness, itching, burning, or irritation, stop using the product. A patch test may help identify initial irritation, but it cannot rule out an allergy or guarantee that a reaction won\u2019t develop with continued use or when applied to another area. If you have known allergies, a sensitive scalp, or an existing skin condition, speak with a dermatologist or healthcare professional before introducing a new product.",
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
        "Apply a few drops directly to the scalp, focusing on targeted areas, and gently massage it in. For best results, use 3\u20134 times per week.",
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
      question: "What if I have allergies or sensitive skin?",
      answer:
        "Please review the full ingredient list before using any Komb product, and avoid products containing ingredients you\u2019re allergic to. Our Renewal Hair Moisturizer contains sweet almond oil, so it may not be suitable for those with an almond or tree nut allergy. We recommend testing a small amount on a small area of skin before first use. If you experience redness, itching, burning, or irritation, stop using the product. A patch test may help identify initial irritation, but it cannot rule out an allergy or guarantee that a reaction won\u2019t develop with continued use or when applied to another area. If you have known allergies, a sensitive scalp, or an existing skin condition, speak with a dermatologist or healthcare professional before introducing a new product.",
    },
    {
      question: "Can I use it with the Renewal Hair Moisturizer?",
      answer:
        "Yes. They are made as a two-step routine: the serum for the scalp first, then the moisturizer through the lengths. Shampoo and rinse thoroughly to remove the serum before applying the moisturizer.",
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
      question: "What if I have allergies or sensitive skin?",
      answer:
        "Please review the full ingredient list before using any Komb product, and avoid products containing ingredients you\u2019re allergic to. Our Renewal Hair Moisturizer contains sweet almond oil, so it may not be suitable for those with an almond or tree nut allergy. We recommend testing a small amount on a small area of skin before first use. If you experience redness, itching, burning, or irritation, stop using the product. A patch test may help identify initial irritation, but it cannot rule out an allergy or guarantee that a reaction won\u2019t develop with continued use or when applied to another area. If you have known allergies, a sensitive scalp, or an existing skin condition, speak with a dermatologist or healthcare professional before introducing a new product.",
    },
    {
      question: "Can I use it with the Botanical Hair Serum?",
      answer:
        "Yes. They are made as a two-step routine: the serum for the scalp first, then the moisturizer through the lengths. Wash the serum out first: shampoo and rinse thoroughly, then apply the leave-in moisturizer.",
    },
    {
      question: "How long does it keep once opened?",
      answer: "Use it within 6 months of opening.",
    },
  ],
};
