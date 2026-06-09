export function PipelineDemo() {
  return (
    <section id="pipeline-demo" className="py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-32 font-display font-bold text-text-primary text-center mb-12">
          See the pipeline in action
        </h2>
        <div className="bg-navy-surface1 border border-navy-border rounded-8 overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-navy-border">
            <div className="w-2.5 h-2.5 rounded-full bg-red-accent/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-accent/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-accent/50" />
            <span className="ml-2 text-12 text-text-secondary font-mono">VelaBeam Pipeline</span>
          </div>

          {/* Animated steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-navy-border">
            {/* Step 1: Query */}
            <div className="p-6">
              <p className="text-12 font-mono text-cobalt mb-3 uppercase tracking-wider">Step 1 — Scan</p>
              <div className="font-mono text-13 space-y-2">
                <div className="text-text-secondary">
                  <span className="text-cobalt">&gt;</span> scan <span className="text-green-accent">&quot;Austin, TX&quot;</span>
                </div>
                <div className="text-text-secondary">→ radius: 15mi</div>
                <div className="text-text-secondary">→ categories: all</div>
                <div className="text-green-accent text-12 mt-3">✓ 14 businesses found without websites</div>
              </div>
            </div>

            {/* Step 2: Pick + Generate */}
            <div className="p-6">
              <p className="text-12 font-mono text-cobalt mb-3 uppercase tracking-wider">Step 2 — Generate</p>
              <div className="font-mono text-13 space-y-2">
                <div className="text-text-primary">TideWell Plumbing</div>
                <div className="text-text-secondary">→ template: plumber</div>
                <div className="text-text-secondary">→ primary: #1E6BB8</div>
                <div className="text-text-secondary">→ sections: 6</div>
                <div className="text-green-accent text-12 mt-3">✓ Site generated in 0.8s</div>
              </div>
            </div>

            {/* Step 3: Deploy */}
            <div className="p-6">
              <p className="text-12 font-mono text-cobalt mb-3 uppercase tracking-wider">Step 3 — Deploy</p>
              <div className="font-mono text-13 space-y-2">
                <div className="text-text-secondary">→ subdomain: tidewell-plumbing</div>
                <div className="text-text-secondary">→ status: <span className="text-green-accent">live</span></div>
                <div className="text-text-secondary">
                  → url: <span className="text-cobalt">tidewell-plumbing.velabeam.app</span>
                </div>
                <div className="text-green-accent text-12 mt-3">✓ Deployed · Ready for preview</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
