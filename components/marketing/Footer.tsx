import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Lead Discovery", href: "/#features" },
      { label: "Site Generator", href: "/#features" },
      { label: "Templates", href: "/#features" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/" },
      { label: "Blog", href: "/" },
      { label: "Careers", href: "/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/" },
      { label: "API Reference", href: "/" },
      { label: "Status", href: "/" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-navy-border py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Wordmark */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-20 font-display font-bold text-cobalt">
              Vela<span className="text-text-primary">Beam</span>
            </Link>
            <p className="text-13 text-text-secondary mt-2">Made for operators</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-12 text-text-secondary uppercase tracking-wider font-medium mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-14 text-text-secondary hover:text-text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-navy-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-12 text-text-secondary">&copy; {new Date().getFullYear()} VelaBeam. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-12 text-text-secondary">Built on Next.js</span>
            <span className="text-12 text-text-secondary">·</span>
            <span className="text-12 text-text-secondary">Deployed on Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
