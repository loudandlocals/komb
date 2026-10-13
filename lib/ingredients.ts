import type { StripIngredient } from "@/components/IngredientStrip";

// Featured ingredients with photos. `handles` lists the products that contain
// each one, so a product page can show only its own.
// Taglines describe the ingredient's character or cosmetic feel only.
export const INGREDIENTS: (StripIngredient & { handles: string[] })[] = [
  {
    name: "Rosemary oil",
    handles: ["botanical-hair-serum"],
    tagline: ["a long history", "in scalp care"],
    where: "In the serum",
    description:
      "An aromatic oil with a long history in scalp care rituals. Published research has looked at rosemary oil on its own. That is not a study of our serum, and we make no growth claims for the finished formula.",
    image: "/images/ingredients/clean/rosemary.jpg",
    alt: "A sprig of rosemary resting in a pool of oil",
  },
  {
    name: "Avocado oil",
    handles: ["botanical-hair-serum"],
    tagline: ["rich and", "cushioning"],
    where: "In the serum",
    description:
      "A rich, cushioning oil that leads the serum\u2019s blend. It gives the serum its smooth feel as you massage it into the scalp.",
    image: "/images/ingredients/clean/avocado.jpg",
    alt: "Half an avocado resting in a pool of oil",
  },
  {
    name: "Olive oil",
    handles: ["botanical-hair-serum", "renewal-hair-moisturizer"],
    tagline: ["a classic", "conditioner"],
    where: "In both",
    description:
      "A classic conditioning oil found in both formulas. It links the scalp step to the lengths step.",
    image: "/images/ingredients/clean/olives.jpg",
    alt: "Green olives resting in a pool of oil",
  },
  {
    name: "Shea & mango butters",
    handles: ["renewal-hair-moisturizer"],
    tagline: ["for soft,", "smooth lengths"],
    where: "In the moisturizer",
    description:
      "Rich plant butters at the heart of the moisturizer. They help lengths feel soft, smooth and more manageable.",
    image: "/images/ingredients/clean/shea.jpg",
    alt: "A block of pale plant butter, softening at the edges",
  },
  {
    name: "Juniper berry oil",
    handles: ["botanical-hair-serum"],
    tagline: ["crisp and", "botanical"],
    where: "In the serum",
    description:
      "A crisp botanical oil that rounds out the serum\u2019s blend alongside rosemary.",
    image: "/images/ingredients/clean/berries.jpg",
    alt: "Dark juniper berries resting in a pool of oil",
  },
];

// A product's own ingredients first, then the ones it shares.
export const ingredientsFor = (handle: string) =>
  INGREDIENTS.filter((i) => i.handles.includes(handle)).sort(
    (a, b) => a.handles.length - b.handles.length
  );
