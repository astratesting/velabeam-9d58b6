export function Testimonials() {
  const placeholders = [
    {
      quote: "[Testimonial placeholder — to be replaced with real customer quotes post-launch]",
      role: "Freelance web developer",
    },
    {
      quote: "[Testimonial placeholder — to be replaced with real customer quotes post-launch]",
      role: "Small agency owner",
    },
    {
      quote: "[Testimonial placeholder — to be replaced with real customer quotes post-launch]",
      role: "Web development consultant",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-32 font-display font-bold text-text-primary text-center mb-12">
          What operators are saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placeholders.map((t, i) => (
            <div key={i} className="bg-navy-surface1 border border-navy-border rounded-8 p-6">
              <p className="text-14 text-text-secondary italic mb-4 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-navy-surface2 flex items-center justify-center text-14 text-text-secondary font-medium">
                  {String.fromCharCode(65 + i)}
                </div>
                <div>
                  <p className="text-14 text-text-primary font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
