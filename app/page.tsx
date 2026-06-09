import { Nav } from "@/components/marketing/Nav";
import { Hero } from "@/components/marketing/Hero";
import { Problem } from "@/components/marketing/Problem";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Features } from "@/components/marketing/Features";
import { PipelineDemo } from "@/components/marketing/PipelineDemo";
import { PricingCards } from "@/components/marketing/PricingCards";
import { Testimonials } from "@/components/marketing/Testimonials";
import { FAQ } from "@/components/marketing/FAQ";
import { FinalCTA } from "@/components/marketing/FinalCTA";
import { Footer } from "@/components/marketing/Footer";

export default function HomePage() {
  return (
    <main>
      <Nav />
      <Hero />
      {/* Logo strip */}
      <section className="py-8 border-y border-navy-border bg-navy-base">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-wrap items-center justify-center gap-6 text-13 text-text-secondary">
          <span>Built on Next.js</span>
          <span className="text-navy-border">·</span>
          <span>Deployed on Vercel</span>
          <span className="text-navy-border">·</span>
          <span>Powered by OpenAI</span>
        </div>
      </section>
      <Problem />
      <HowItWorks />
      <Features />
      <PipelineDemo />
      <PricingCards />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
