import { Nav } from "@/components/marketing/Nav";
import { PricingCards } from "@/components/marketing/PricingCards";
import { Footer } from "@/components/marketing/Footer";

export default function PricingPage() {
  return (
    <main>
      <Nav />
      <div className="py-16">
        <PricingCards />
      </div>
      <Footer />
    </main>
  );
}
