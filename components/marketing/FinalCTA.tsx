import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PierLine } from "./harbor/PierLine";

export function FinalCTA() {
  return (
    <section className="py-24 relative">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <PierLine className="w-64 h-1 mx-auto mb-10 opacity-50" />
        <h2 className="text-44 font-display font-bold text-text-primary mb-4">
          Open the console. Find your next ten clients.
        </h2>
        <p className="text-16 text-text-secondary max-w-xl mx-auto mb-8">
          Start scanning your area for businesses that need a website — and ship theirs before the competition calls.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/register">
            <Button size="lg">Start free trial</Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="ghost">View pricing</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
