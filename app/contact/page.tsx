import { JoinTypeformSection } from "@/components/JoinTypeformSection";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F4E9D8] pt-24 sm:pt-28">
      <JoinTypeformSection
        compactSpacing
        title="get in touch"
        afterForm={
          <p className="font-body mx-auto max-w-xl text-center text-base leading-relaxed text-[#2C2C2A] sm:text-lg">
            feel free to email us at{" "}
            <a
              href="mailto:atewith8@gmail.com"
              className="text-[#1B2A6B] underline decoration-[#c9b8a0] underline-offset-2 transition-colors hover:text-[#C1440E] hover:decoration-[#C1440E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A6B]"
            >
              atewith8@gmail.com
            </a>
          </p>
        }
      />
    </main>
  );
}
