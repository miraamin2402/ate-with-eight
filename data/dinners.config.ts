/**
 * Dinner archives — paths match files in /public exactly (case-sensitive on some hosts).
 * Scanned from public/ on 2026-04-01.
 */

export type DinnerArchiveEntry = {
  /** 1-based dinner number */
  id: number;
  title: string;
  menuImage: string;
  photos: string[];
  /** Back-of-card blurb: one string per sentence (rendered with line breaks). */
  backBlurb: string[];
};

export const DINNERS_ARCHIVE: DinnerArchiveEntry[] = [
  {
    id: 1,
    title: "Dinner No. 1",
    menuImage: "/dinner1menu.png",
    photos: [
      "/dinner1pic1.jpeg",
      "/dinner1pic2.jpeg",
      "/dinner1pic3.JPG",
      "/dinner1pic4.JPG",
    ],
    backBlurb: [
      "my very first 8w8 dinner, for nyc hopkins alumni in tech",
      "a few founders, a few engineers, and a few operators",
      "lots of kinks, but made it work in the end",
    ],
  },
  {
    id: 2,
    title: "Dinner No. 2",
    menuImage: "/dinner2menu.png",
    photos: [
      "/dinner2pic1.JPG",
      "/dinner2pic2.jpeg",
      "/dinner2pic3.JPEG",
      "/dinner2pic4.jpeg",
      "/dinner2pic5.JPG",
    ],
    backBlurb: [
      "cohosted with rayouf, designer & fellow investor at bvp",
      "hosted for women in the nyc startup ecosystem",
      "the coconut cake (while i clearly cannot decorate for the life of me) was the star of the show",
    ],
  },
  {
    id: 3,
    title: "Dinner No. 3",
    menuImage: "/dinner3menu.png",
    photos: [
      "/dinner3pic1.jpeg",
      "/dinner3pic2.jpeg",
      "/dinner3pic3.jpeg",
      "/dinner3pic4.jpeg",
      "/dinner3pic5.jpeg",
    ],
    backBlurb: [
      "cohosted with maha, co-lead of early-stage investing at bvp",
      "hosted for the nyc startup ecosystem",
      "another mix of engineers, founders & operators",
      "maha made an incredible tres leches cake",
    ],
  },
  {
    id: 4,
    title: "Dinner No. 4",
    menuImage: "/dinner4menu.png",
    photos: [
      "/dinner4pic1.jpeg",
      "/dinner4pic2.JPEG",
      "/dinner4pic3.JPG",
      "/dinner4pic4.JPG",
      "/dinner4pic5.JPG",
    ],
    backBlurb: [
      "cohosted with maha",
      "hosted for the nyc startup ecosystem",
      "a few founders, a few engineers, and a few folks hacking on weekends & exploring starting their own companies",
      "my first full-fledged indian menu, many of which are my mothers' recipes",
    ],
  },
  {
    id: 5,
    title: "Dinner No. 5",
    menuImage: "/dinner5menu.png",
    photos: [
      "/dinner5pic1.jpeg",
      "/dinner5pic2.jpeg",
      "/dinner5pic3.JPG",
      "/dinner5pic4.JPG",
      "/dinner5pic5.jpg",
    ],
    backBlurb: [
      "cohosted with maha",
      "hosted deployment strategists, fdes, and anyone deep in enterprise ai transformation",
      "menu was indian fusion this time, and i learned how to make pistachio butter from scratch",
      "turns out you just need roasted unsalted pistachios and patience :)",
    ],
  },
];
