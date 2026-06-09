import { PierLine } from "./harbor/PierLine";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Scan",
      description: "Enter a city and radius. VelaBeam finds local businesses with no web presence.",
    },
    {
      number: "02",
      title: "Pick",
      description: "Review leads by category, rating, and status. Save the ones worth pursuing.",
    },
    {
      number: "03",
      title: "Generate",
      description: "Select an industry template and VelaBeam drafts a complete, branded site in seconds.",
    },
    {
      number: "04",
      title: "Deploy",
      description: "Preview, tweak, and publish to a live subdomain. Walk into the sales call with a URL.",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-32 font-display font-bold text-text-primary text-center mb-12">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.number} className="relative text-center">
              <div className="w-12 h-12 rounded-8 border border-navy-border flex items-center justify-center mx-auto mb-4">
                <span className="text-16 font-mono font-semibold text-cobalt">{step.number}</span>
              </div>
              <h3 className="text-16 font-semibold text-text-primary mb-2 font-sans">{step.title}</h3>
              <p className="text-14 text-text-secondary leading-relaxed">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[60%] w-[80%]">
                  <PierLine className="w-full h-1" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
