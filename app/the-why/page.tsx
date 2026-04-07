"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const maxContent = "mx-auto w-full max-w-[720px]";
const whoAreWeContent = "mx-auto w-full max-w-[1100px]";

const sectionMotion = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, ease: "easeOut" as const },
};

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      className={`font-heading text-2xl font-normal italic tracking-tight text-[#1B2A6B] sm:text-3xl`}
    >
      {children}
    </h2>
  );
}

export default function TheWhyPage() {
  return (
    <main className="min-h-screen bg-[#F4E9D8] px-5 pb-24 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
      <div className={whoAreWeContent}>
        {/* Section 1: who are we */}
        <motion.section {...sectionMotion}>
          <SectionHeading>who are we</SectionHeading>
          <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-start md:gap-8">
            <div className="mx-auto w-[220px] shrink-0 md:mx-0">
              <div className="relative h-[264px] w-[220px] overflow-hidden rounded-[8px]">
                <Image
                  src="/mira.jpg"
                  alt="Mira Amin"
                  fill
                  className="object-cover object-top"
                  sizes="220px"
                />
              </div>
              <p className="font-heading mt-3 text-center text-[18px] font-normal leading-snug text-[#2c2419]">
                mira amin, founder
              </p>
            </div>
            <p className="min-w-0 flex-1 basis-0 text-left font-body text-[15px] leading-[1.75] text-[#4a4238] md:min-w-[300px]">
              cooking is my biggest passion. my journey started during my junior year of college,
              where i learned how to cook out of necessity when i was no longer on my
              college&apos;s meal plan. somewhere along the way, i completely fell in love with
              it. i read cookbooks from front to back, watch every cooking show in existence, and
              pester my family members for their recipes. i loved the way food brought everyone
              together, and without having to say it in words, it simply told my community that
              &quot;i care.&quot; perhaps most special, however, is how cooking connected me even
              more than i thought could be possible with my mother and both my grandmothers.
            </p>
            <p className="min-w-0 flex-1 basis-0 text-left font-body text-[15px] leading-[1.75] text-[#4a4238] md:min-w-[300px]">
              outside of the kitchen, i studied chemical &amp; biomolecular engineering at
              johns hopkins, got involved with the entrepreneur ecosystem there, worked a couple
              gigs in growth equity, and am now a full-time early-stage investor at bessemer
              venture partners. 8w8 is where those two worlds meet: my love for cooking+hosting
              and being a ~professional connector~, if you will.
            </p>
          </div>
        </motion.section>
      </div>

      <div className={`mt-16 max-w-full space-y-16 sm:mt-20 sm:space-y-20 ${maxContent}`}>
        {/* Section 2: current & past cohosts */}
        <motion.section {...sectionMotion}>
          <SectionHeading>current &amp; past cohosts</SectionHeading>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:mt-10 sm:gap-x-8">
            <div className="flex justify-center md:justify-start">
              <div className="relative h-[240px] w-[200px] shrink-0 overflow-hidden rounded-[8px]">
                <Image
                  src="/maha.jpg"
                  alt="Maha Malik"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            </div>
            <div className="flex justify-center md:justify-start">
              <div className="relative h-[240px] w-[200px] shrink-0 overflow-hidden rounded-[8px]">
                <Image
                  src="/rayouf.JPG"
                  alt="Rayouf Alhumedhi"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            </div>
            <h3 className="font-heading text-center text-lg font-normal sm:text-xl md:text-left">
              <Link
                href="https://www.linkedin.com/in/maha-malik-02871455/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2c2419] border-b border-[#2c2419] pb-0.5 transition-opacity hover:opacity-80"
              >
                maha malik
              </Link>
            </h3>
            <h3 className="font-heading text-center text-lg font-normal sm:text-xl md:text-left">
              <Link
                href="https://www.linkedin.com/in/rayouf/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2c2419] border-b border-[#2c2419] pb-0.5 transition-opacity hover:opacity-80"
              >
                rayouf alhumedhi
              </Link>
            </h3>
            <div className="font-body text-center text-[15px] leading-[1.75] text-[#1B2A6B] md:text-left">
              {/* add maha's personal site link here later */}
              <p>
                maha grew up in pakistan, where doors were open, meals were shared freely, and it was
                never unusual for strangers or neighbors to be pulled in and fed like family. she spent
                a decade at bain before joining bessemer, where she is now a leader in bvp&apos;s
                pre-seed and seed investing efforts. she is also the current co-host of ate with
                eight, and we collaborated on dinners 3, 4, and 5 in q1 2026. these days, maha is a
                dessert and baking enthusiast. she made a banana pudding at our fifth dinner that is
                genuinely better than magnolia bakery (ifykyk). she&apos;s also an avid writer and
                traveler, which nourishes her love for new cuisines and bringing people together.
              </p>
            </div>
            <div className="font-body text-center text-[15px] leading-[1.75] text-[#1B2A6B] md:text-left">
              <p>
                hailing from riyadh, but growing up in berlin and vienna, rayouf is a designer turned
                investor at bessemer who loves all things creative ai. she also is the creator of the
                hijabi emoji 🧕🏻. we teamed up to host women in the startup ecosystem in nyc for a ~ girl
                dinner ~ on a crisp friday night in october 2025. learn more about rayouf{" "}
                <Link
                  href="https://rayouf.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-[#1B2A6B] pb-0.5 transition-opacity hover:opacity-80"
                >
                  here
                </Link>
                .
              </p>
            </div>
          </div>
        </motion.section>

        {/* Section 3: the why */}
        <motion.section {...sectionMotion}>
          <SectionHeading>the why</SectionHeading>
          <div className="font-body mt-8 space-y-5 text-base leading-[1.75] text-[#4a4238] sm:mt-10 sm:text-lg sm:leading-[1.8]">            <p>
              i really love to cook, and i really love to host. so ate with eight (8w8) started pretty
              selfishly: it scratched the itch. but i decided to focus on the nyc startup community because
              i kept feeling that the cohesive tech community that sf has was missing here. the city is
              full of talented people, building incredible things, but everyone is somewhat living
              separate lives (which could be both a good or bad thing). so i thought, what if we could
              bring people together over a casual, home-cooked meal?
            </p>
            <p>
              this idea was born out of wanting to build community as someone still a little new to
              nyc, staying authentic, and pursuing what excites you. and maybe being lucky enough to sit
              at the table (or at least be a fly on the wall) among people who inspire you.
            </p>
            <p>
              every few weeks, we host 8 guests at my tiny 500 sq ft studio apartment in nyc for a
              3-course, entirely homecooked meal. this is a casual, intimate, and curated dinner,
              and there&apos;s really no shoptalk (we promise that we are in no way trying to
              triangulate your ARR - VCs get a bad rap for this)!
            </p>
          </div>
        </motion.section>

        {/* Section 4: key philosophies */}
        <motion.section {...sectionMotion}>
          <SectionHeading>key philosophies</SectionHeading>
          <div className="font-body mt-8 space-y-8 text-base leading-[1.75] text-[#4a4238] sm:mt-10 sm:text-lg sm:leading-[1.8]">
            <p>
              <span className="font-semibold text-[#2c2419]">one table, one conversation.</span>{" "}
              eight is the magic number. it&apos;s small enough that everyone stays in one
              conversation, and by dessert, nobody&apos;s a stranger. plus candidly, eight is the most
              amount of people that can comfortably fit in my
              tiny apartment.
            </p>
            <p>
              <span className="font-semibold text-[#2c2419]">the mix matters.</span>{" "}
              after 5 dinners now, one of our favorite things has been putting together people with
              completely different roles, different types and stages of companies they work at,
              different ages, and different paths into tech. there&apos;s something special about the
              diversity of people working in such a dynamic environment and living in a city like
              new york. we&apos;ve had some of the most unique conversations at our past dinners
              because of that.
            </p>
            <p>
              <span className="font-semibold text-[#2c2419]">themed dinners.</span>{" "}
              sometimes we curate the guest list around a theme. so far we&apos;ve hosted dinners
              for johns hopkins alum, women in the startup ecosystem, and FDEs and deployment
              strategists. other times, we just gather people who work at any startup in nyc
              (regardless of whether they are a founder, operator, or engineer).
            </p>
          </div>
          <p className="mt-10">
            <Link
              href="https://miraamin1.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body inline-flex items-center gap-1 border-b border-[#C1440E] pb-0.5 text-base text-[#C1440E] transition-colors hover:border-[#a3360b] hover:text-[#a3360b] sm:text-lg"
            >
              read more on substack →
            </Link>
          </p>
        </motion.section>

        {/* Section 5: one ask */}
        <motion.section
          initial={sectionMotion.initial}
          whileInView={sectionMotion.whileInView}
          viewport={sectionMotion.viewport}
          transition={sectionMotion.transition}
          className="mt-4 pt-10 sm:pt-16"
        >
          <p className="font-body text-sm italic leading-[1.75] text-[#4a4238] sm:text-base sm:leading-[1.8]">
            note: if you confirm a seat at the table, please really commit to coming. these dinners
            are curated and small, and days of prep go into every single one. we totally understand
            that things come up (as they do in startup-land), but please give us as much notice as
            possible. if you have to cancel last minute, feel free to send a friend or colleague in
            your place if you can!
          </p>
        </motion.section>
      </div>
    </main>
  );
}
