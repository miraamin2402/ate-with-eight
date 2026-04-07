"use client";

import Image from "next/image";

export type GalleryProps = {
  showHeading?: boolean;
};

type GalleryImage = {
  src: string;
  alt: string;
};

/** Matches files in public/gallery/ exactly (case-sensitive on many hosts). */
const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/gallery/dinner4.JPG",
    alt: "Dinner photo — dinner4",
  },
  { src: "/gallery/dinner1.jpg", alt: "Dinner photo — dinner1" },
  { src: "/gallery/dinner9.jpg", alt: "Dinner photo — dinner9" },
  { src: "/gallery/dinner7.JPG", alt: "Dinner photo — dinner7" },
  { src: "/gallery/dinner8.JPG", alt: "Dinner photo — dinner8" },
  { src: "/gallery/dinner6.JPG", alt: "Dinner photo — dinner6" },
];

export function Gallery({ showHeading = true }: GalleryProps) {
  return (
    <section className="bg-[#F4E9D8] pt-10 pb-24 sm:pt-12 sm:pb-32">
      <div className="mx-auto max-w-6xl">
        {showHeading ? (
          <h2 className="font-heading mb-8 px-5 text-center text-3xl tracking-tight lowercase text-[#722F37] sm:mb-10 sm:px-8 sm:text-4xl">
            the table so far
          </h2>
        ) : null}

        <div
          className="grid w-full grid-cols-1 gap-2 px-5 sm:px-8 md:grid-cols-2 md:gap-2"
          aria-label="Dinner photo gallery"
        >
          {GALLERY_IMAGES.map((image) => (
            <div
              key={image.src}
              className="relative h-[300px] w-full overflow-hidden rounded-[4px]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 767px) 100vw, 50vw"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
