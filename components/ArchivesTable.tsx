"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { DINNERS_ARCHIVE, type DinnerArchiveEntry } from "@/data/dinners.config";

/** Flip card width: plate row = 20 + 20 + 300 + 20 + 14 + 14 + 24 px */
const MENU_W = 420;
const PHOTO_PX = 190;

const PLATE_INSET_SHADOW =
  "inset 0 0 0 8px #FAF3E8, inset 0 0 0 10px #5C6B3C, inset 0 0 0 20px #FAF3E8, inset 0 0 0 21px #d4c9b8, 0 4px 12px rgba(0,0,0,0.1)";

const UTENSIL_SILHOUETTE = {
  fill: "#C4BAB0",
  fillOpacity: 0.45,
} as const;

/** viewBox 14×110: 3px margins; tines 22 + neck taper 12 + handle 70 = 104; 4 tines on 14px with (14−10)/3 gaps */
function UtensilForkSvg({ className }: { className?: string }) {
  const g = (14 - 4 * 2.5) / 3;
  const t = [0, 2.5 + g, 2 * (2.5 + g), 3 * (2.5 + g)] as const;
  return (
    <svg className={className} viewBox="0 0 14 110" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g {...UTENSIL_SILHOUETTE}>
        {t.map((x, i) => (
          <rect key={i} x={x} y="3" width="2.5" height="22" rx="1" />
        ))}
        <path d="M 0 25 L 14 25 L 10.5 37 L 3.5 37 Z" />
        <rect x="3.5" y="37" width="7" height="70" rx="3" />
      </g>
    </svg>
  );
}

/** viewBox 14×110: blade (straight spine left, curved edge to tip) + 8×70 handle */
function UtensilKnifeSvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 110" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g {...UTENSIL_SILHOUETTE}>
        <path d="M 2 35 L 2 12 C 2 4 4.5 0 8.5 0 C 11.5 0 13 5 12.5 14 L 12 35 Z" />
        <rect x="3" y="35" width="8" height="75" rx="4" />
      </g>
    </svg>
  );
}

/** viewBox 24×110: 22×30 oval bowl + 8×70 handle */
function UtensilSpoonSvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 110" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g {...UTENSIL_SILHOUETTE}>
        <ellipse cx="12" cy="15" rx="11" ry="15" />
        <rect x="8" y="30" width="8" height="80" rx="4" />
      </g>
    </svg>
  );
}

const rowMotion = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, ease: "easeOut" as const },
};

function MenuPlateContent({ dinner }: { dinner: DinnerArchiveEntry }) {
  return (
    <div className="relative mx-auto h-[300px] w-[410px] shrink-0">
      <UtensilForkSvg className="absolute left-0 top-1/2 h-[110px] w-5 -translate-y-1/2" />
      <div
        className="absolute left-[40px] top-0 flex size-[300px] items-center justify-center rounded-full bg-[#FAF3E8]"
        style={{ boxShadow: PLATE_INSET_SHADOW }}
      >
        <div className="box-border max-w-[240px] px-3 py-4 text-center font-caveat text-[14px] font-bold leading-[1.7]">
          {dinner.backBlurb.map((sentence, i) => (
            <p key={i} className="mb-1.5 last:mb-0">
              <span className="text-[#C1440E]" aria-hidden>
                •{" "}
              </span>
              <span className="text-[#1B2A6B]">{sentence}</span>
            </p>
          ))}
        </div>
      </div>
      <UtensilKnifeSvg className="absolute left-[360px] top-1/2 h-[110px] w-[14px] -translate-y-1/2" />
      <UtensilSpoonSvg className="absolute left-[388px] top-1/2 h-[110px] w-[22px] -translate-y-1/2" />
    </div>
  );
}

const FLIP_CARD_STRUCTURE_HELP = `
FlipMenuCard JSX nesting (className summary):
  div.flip-card-root.group
    [perspective:1000px] mx-auto w-full max-w-[420px] shrink-0 md:mx-0 md:w-[420px] md:flex-shrink-0
    └─ div.flip-inner
         relative min-h-[400px] w-full max-w-[420px]
         [transform-style:preserve-3d] transition-[transform] duration-[600ms] ease-in-out
         group-hover:[transform:rotateY(180deg)]
       ├─ div.flip-face-back (BACK FIRST)
       │    absolute inset-0 z-0 … rounded-[8px] (inset-0 = top/left 0 + fill to fill min-height parent)
       │    bg-[#F4E9D8] [background-color:#F4E9D8]
       │    flex flex-col items-center justify-center px-2 py-4
       │    [backface-visibility:hidden] [transform:rotateY(180deg)]
       │    └─ MenuPlateContent (plate + absolute fork / knife / spoon SVGs)
       └─ div.flip-face-front
            absolute inset-0 z-10 rounded-[8px]
            [backface-visibility:hidden] [transform:rotateY(0deg)]
            └─ Next/Image fill object-contain rounded-[8px]
`;

function FlipMenuCard({
  dinner,
  className = "",
}: {
  dinner: DinnerArchiveEntry;
  className?: string;
}) {
  const cardRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dinner.id !== 1) return;
    console.log("[ArchivesTable FlipMenuCard] structure help:\n", FLIP_CARD_STRUCTURE_HELP);
    const el = cardRootRef.current;
    if (el) {
      console.log("[ArchivesTable FlipMenuCard] root outerHTML (dinner id=1):\n", el.outerHTML);
    }
  }, [dinner.id]);

  return (
    <div
      ref={cardRootRef}
      className={`flip-card-root group mx-auto w-full max-w-[420px] shrink-0 [perspective:1000px] md:mx-0 md:w-[420px] md:max-w-none md:flex-shrink-0 ${className}`}
    >
      <div
        className="flip-inner relative mx-auto min-h-[400px] w-full max-w-[420px] [transform-style:preserve-3d] transition-[transform] duration-[600ms] ease-in-out md:mx-0 md:w-[420px] md:max-w-none group-hover:[transform:rotateY(180deg)]"
      >
        <div
          className="flip-face-back absolute inset-0 z-0 flex flex-col items-center justify-center rounded-[8px] bg-[#F4E9D8] px-2 py-4 [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ backgroundColor: "#F4E9D8" }}
        >
          <MenuPlateContent dinner={dinner} />
        </div>
        <div className="flip-face-front absolute inset-0 z-10 rounded-[8px] [backface-visibility:hidden] [transform:rotateY(0deg)]">
          <Image
            src={dinner.menuImage}
            alt={`${dinner.title} menu`}
            fill
            quality={100}
            className="rounded-[8px] object-contain object-center"
            sizes={`(max-width: 767px) 100vw, ${MENU_W}px`}
            draggable={false}
            priority={dinner.id <= 2}
          />
        </div>
      </div>
    </div>
  );
}

function PhotoGridDesktop({
  photos,
  dinnerTitle,
  cols,
  justify,
}: {
  photos: string[];
  dinnerTitle: string;
  cols: number;
  justify: "center" | "start";
}) {
  const justifyCls = justify === "start" ? "md:justify-start" : "md:justify-center";
  return (
    <div className={`hidden min-h-0 md:flex md:min-w-0 md:flex-1 md:items-center ${justifyCls}`}>
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${PHOTO_PX}px)`,
        }}
      >
        {photos.map((src) => (
          <div
            key={src}
            className="relative overflow-hidden rounded-md bg-[#e0ddd4]"
            style={{ width: PHOTO_PX, height: PHOTO_PX }}
          >
            <Image
              src={src}
              alt={`${dinnerTitle} — dinner photo`}
              fill
              className="object-cover object-center"
              sizes={`${PHOTO_PX}px`}
              quality={100}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function PhotoGridMobile({
  photos,
  dinnerTitle,
}: {
  photos: string[];
  dinnerTitle: string;
}) {
  const n = photos.length;
  const cols = n >= 4 ? 2 : 1;
  return (
    <div className={`grid w-full gap-2 md:hidden ${cols === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
      {photos.map((src) => (
        <div key={src} className="relative aspect-square w-full overflow-hidden rounded-md bg-[#e0ddd4]">
          <Image
            src={src}
            alt={`${dinnerTitle} — dinner photo`}
            fill
            className="object-cover object-center"
            sizes="50vw"
            quality={100}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}

function PhotoGrid({
  photos,
  dinnerTitle,
  desktopJustify = "center",
}: {
  photos: string[];
  dinnerTitle: string;
  desktopJustify?: "center" | "start";
}) {
  if (photos.length === 0) return null;
  const n = photos.length;
  const desktopCols = n >= 5 ? 3 : 2;

  return (
    <div className="w-full min-w-0 md:flex md:min-w-0 md:flex-1 md:basis-0 md:flex-col md:items-stretch">
      <PhotoGridMobile photos={photos} dinnerTitle={dinnerTitle} />
      <PhotoGridDesktop
        photos={photos}
        dinnerTitle={dinnerTitle}
        cols={desktopCols}
        justify={desktopJustify}
      />
    </div>
  );
}

export function ArchivesTable() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-[1100px] px-5 sm:px-8">
      <h1 className="font-heading text-center text-2xl font-normal italic tracking-tight text-[#1B2A6B] sm:text-3xl">
        past dinners
      </h1>

      <div className="mt-14 space-y-12 sm:mt-16">
        {DINNERS_ARCHIVE.map((dinner, index) => {
          const isOdd = index % 2 === 0;
          const hasPhotos = dinner.photos.length > 0;
          const isDinner1 = dinner.id === 1;
          return (
            <motion.div
              key={dinner.id}
              {...rowMotion}
              className={`flex min-h-0 min-w-0 w-full max-w-full flex-col gap-6 md:flex-row md:flex-nowrap md:items-center ${isDinner1 ? "md:gap-2" : "md:gap-6"} ${isOdd ? "" : "md:flex-row-reverse"}`}
            >
              <FlipMenuCard
                dinner={dinner}
                className={
                  isDinner1 ? "overflow-hidden rounded-[8px] md:-ml-2" : ""
                }
              />
              {hasPhotos ? (
                <PhotoGrid
                  photos={dinner.photos}
                  dinnerTitle={dinner.title}
                  desktopJustify={isDinner1 ? "start" : "center"}
                />
              ) : null}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
