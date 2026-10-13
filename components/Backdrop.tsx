/** Ambient section backgrounds: light fields, circuit traces and grain. Purely decorative. */

const traces = [
  "M-20 140 H180 L230 190 H420 L470 140 H760",
  "M-20 300 H120 L170 350 H360",
  "M820 420 H640 L590 470 H460 L410 520 H240",
  "M820 640 H700 L650 590 H520",
  "M60 -20 V80 L110 130 V260",
  "M700 -20 V60 L650 110 V220",
];

export function CircuitLines({ className = "" }: { className?: string }) {
  return (
    <svg className={`circuit ${className}`} viewBox="0 0 800 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {traces.map((d, i) => (
          <g key={i}>
            <path d={d} className="circuit__base" />
            <path d={d} className="circuit__pulse" style={{ animationDelay: `${i * -1.7}s` }} />
          </g>
        ))}
      </g>
      {[
        [230, 190],
        [470, 140],
        [170, 350],
        [590, 470],
        [410, 520],
        [650, 590],
        [110, 130],
        [650, 110],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" className="circuit__node" />
      ))}
    </svg>
  );
}

export function Glow({ variant = "hero" }: { variant?: "hero" | "cta" | "soft" }) {
  return (
    <div className={`glow glow--${variant}`} aria-hidden="true">
      <span className="glow__a" />
      <span className="glow__b" />
      <span className="glow__c" />
    </div>
  );
}
