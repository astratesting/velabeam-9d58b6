export function Problem() {
  const cards = [
    {
      stat: "9M",
      title: "businesses. No website.",
      description: "27% of US small businesses have zero web presence — and most don't know where to start.",
    },
    {
      stat: "4h",
      title: "Prospecting eats your Friday.",
      description: "Finding, qualifying, and reaching out to local leads takes hours of manual research per week.",
    },
    {
      stat: "8h",
      title: "Mockups eat your weekend.",
      description: "Designing a first-draft site from scratch for each prospect is slow, repetitive, and soul-crushing.",
    },
  ];

  return (
    <section className="bg-navy-surface1 py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.stat}
              className="border border-navy-border rounded-8 p-6 bg-navy-base"
            >
              <p className="text-32 font-mono font-bold text-cobalt mb-2">{card.stat}</p>
              <h3 className="text-16 font-semibold text-text-primary mb-2 font-sans">{card.title}</h3>
              <p className="text-14 text-text-secondary leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
