// PLACEHOLDER REVIEWS. Written to show the layout only: none of these are
// from real customers. Replace them with real reviews (ideally through a
// review app such as Judge.me, Okendo or Yotpo) before the site goes public,
// and do not add review structured data until they are real.
//
// Real reviews must stay inside the claims rules as well: none can be shown
// that say the products regrow hair or stop shedding.
export type Review = {
  name: string;
  handle: "botanical-hair-serum" | "renewal-hair-moisturizer";
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
};

export const PLACEHOLDER_REVIEWS: Review[] = [
  {
    name: "Sample reviewer A.",
    handle: "botanical-hair-serum",
    rating: 5,
    title: "My scalp feels so much more comfortable",
    body: "Sample text. A full dropper before bed has become my favourite part of the week. My scalp feels less dry and my hair looks shinier.",
  },
  {
    name: "Sample reviewer B.",
    handle: "renewal-hair-moisturizer",
    rating: 5,
    title: "Softer ends, less frizz",
    body: "Sample text. I work a little through damp hair after washing and my lengths feel softer and are easier to style.",
  },
  {
    name: "Sample reviewer C.",
    handle: "botanical-hair-serum",
    rating: 4,
    title: "A simple routine I can keep",
    body: "Sample text. I like that the directions are clear. I use it three times a week and wash it out in the morning.",
  },
  {
    name: "Sample reviewer D.",
    handle: "renewal-hair-moisturizer",
    rating: 5,
    title: "Smells lovely",
    body: "Sample text. The scent is sweet and creamy without being too much, and my hair feels smooth all day.",
  },
  {
    name: "Sample reviewer E.",
    handle: "botanical-hair-serum",
    rating: 5,
    title: "Feels like a ritual",
    body: "Sample text. The scalp massage is a quiet few minutes for me. My hair feels more nourished and looks healthier.",
  },
  {
    name: "Sample reviewer F.",
    handle: "renewal-hair-moisturizer",
    rating: 4,
    title: "Great on dry days",
    body: "Sample text. I use it on dry hair between washes to smooth flyaways. A little goes a long way.",
  },
];
