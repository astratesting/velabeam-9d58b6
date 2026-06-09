export function PierLine({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 4"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line x1="0" y1="2" x2="100" y2="2" stroke="#1E2D4D" strokeWidth="1" strokeDasharray="4 8" />
      <circle cx="0" cy="2" r="2" fill="#2D5BFF" opacity="0.4" />
      <circle cx="100" cy="2" r="2" fill="#2D5BFF" opacity="0.4" />
    </svg>
  );
}
