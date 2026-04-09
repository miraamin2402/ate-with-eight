import { StepForm } from "@/components/StepForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F4E9D8] px-5 pb-24 pt-24 sm:px-8 sm:pb-32 sm:pt-28">
      <div className="mx-auto w-full max-w-xl">
        <h1 className="font-heading text-center text-2xl font-normal italic tracking-tight text-[#1B2A6B] sm:text-3xl">
          get in touch
        </h1>
        <StepForm className="mt-10" />
      </div>
    </main>
  );
}
