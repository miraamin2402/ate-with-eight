export type DinnerCourse = {
  name: string;
  dish: string;
};

export type Dinner = {
  title: string;
  date: string;
  courses: DinnerCourse[];
  backNote: string;
  photos: string[];
};

export const dinners: Dinner[] = [
  {
    title: "Winter in Liguria",
    date: "February 6, 2025",
    courses: [
      { name: "Starter", dish: "Farinata with rosemary and sea salt" },
      { name: "Main", dish: "Braised rabbit with olives and polenta" },
      { name: "Dessert", dish: "Panna cotta with blood orange" },
    ],
    backNote:
      "Inspired by a rainy week in Genoa and the way anchovy, lemon, and olive oil can feel like sunshine. I wanted something hearty but still bright — the kind of meal that lingers without weighing you down.",
    photos: [
      "/gallery/winter-liguria-1.svg",
      "/gallery/winter-liguria-2.svg",
      "/gallery/winter-liguria-3.svg",
    ],
  },
  {
    title: "Thursday at Home",
    date: "January 16, 2025",
    courses: [
      { name: "Starter", dish: "Roasted beet salad with goat cheese and hazelnuts" },
      { name: "Main", dish: "Coq au vin with crusty bread" },
      { name: "Dessert", dish: "Dark chocolate tart with flaky salt" },
    ],
    backNote:
      "A love letter to the classics I grew up watching my mother make — nothing cheffy, just patience, butter, and a table loud with conversation. The tart was an excuse to open the good wine.",
    photos: ["/gallery/thursday-home-1.svg", "/gallery/thursday-home-2.svg"],
  },
];
