/**
 * Rendered electrical scenes used as art direction until real project
 * photography is supplied. Each scene fills its container (object-fit: cover
 * behaviour via preserveAspectRatio="xMidYMid slice").
 */

type SceneProps = { uid: string; className?: string; title?: string };

function Frame({
  uid,
  className,
  title,
  children,
  viewBox = "0 0 800 1000",
}: SceneProps & { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg
      className={className}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id={`${uid}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="28" />
        </filter>
        <filter id={`${uid}-soft`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id={`${uid}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0" />
        </filter>
      </defs>
      {children}
      <rect width="100%" height="100%" filter={`url(#${uid}-grain)`} opacity="0.7" />
    </svg>
  );
}

/* ---------- Electrical panel, door open ---------- */
export function PanelScene(p: SceneProps) {
  const u = p.uid;
  const rows = Array.from({ length: 10 }, (_, i) => i);
  return (
    <Frame {...p}>
      <defs>
        <linearGradient id={`${u}-wall`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0d1830" />
          <stop offset="1" stopColor="#050a16" />
        </linearGradient>
        <linearGradient id={`${u}-box`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2a3446" />
          <stop offset=".5" stopColor="#3b475c" />
          <stop offset="1" stopColor="#222b3a" />
        </linearGradient>
        <linearGradient id={`${u}-inner`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#111a2a" />
          <stop offset="1" stopColor="#0a101c" />
        </linearGradient>
        <linearGradient id={`${u}-brk`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1b2230" />
          <stop offset=".45" stopColor="#2c3546" />
          <stop offset="1" stopColor="#161c28" />
        </linearGradient>
        <linearGradient id={`${u}-bus`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fe7ff" />
          <stop offset="1" stopColor="#2b7bff" />
        </linearGradient>
        <radialGradient id={`${u}-key`} cx=".3" cy=".1" r=".8">
          <stop offset="0" stopColor="#3d7bff" stopOpacity=".45" />
          <stop offset="1" stopColor="#3d7bff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="1000" fill={`url(#${u}-wall)`} />
      <rect width="800" height="1000" fill={`url(#${u}-key)`} />
      {/* wall texture lines */}
      {Array.from({ length: 14 }, (_, i) => (
        <line key={i} x1="0" x2="800" y1={i * 75 + 20} y2={i * 75 + 20} stroke="#ffffff" strokeOpacity=".018" />
      ))}
      {/* conduit + wires entering */}
      <rect x="300" y="0" width="34" height="150" fill="#2b3446" />
      <rect x="466" y="0" width="34" height="150" fill="#2b3446" />
      <path d="M317 120 C317 190 300 220 300 260" stroke="#0b0f17" strokeWidth="9" fill="none" />
      <path d="M483 120 C483 190 500 220 500 260" stroke="#e9eef6" strokeWidth="7" fill="none" opacity=".85" />
      <path d="M400 0 V260" stroke="#c98a4b" strokeWidth="5" opacity=".7" />
      {/* box shadow */}
      <rect x="170" y="150" width="460" height="760" rx="10" fill="#000" opacity=".55" filter={`url(#${u}-blur)`} />
      {/* enclosure */}
      <rect x="180" y="140" width="440" height="760" rx="10" fill={`url(#${u}-box)`} />
      <rect x="205" y="168" width="390" height="704" rx="6" fill={`url(#${u}-inner)`} />
      {/* bus glow */}
      <rect x="390" y="200" width="20" height="630" rx="4" fill={`url(#${u}-bus)`} opacity=".35" filter={`url(#${u}-soft)`} />
      <rect x="394" y="200" width="12" height="630" rx="3" fill={`url(#${u}-bus)`} opacity=".85" />
      {/* breakers */}
      {rows.map((i) => {
        const y = 212 + i * 61;
        const on = i !== 6;
        return (
          <g key={i}>
            {[0, 1].map((side) => {
              const x = side === 0 ? 236 : 418;
              return (
                <g key={side}>
                  <rect x={x} y={y} width="146" height="48" rx="5" fill={`url(#${u}-brk)`} stroke="#3a4558" strokeWidth="1" />
                  <rect x={side === 0 ? x + 100 : x + 14} y={y + 14} width="32" height="20" rx="3" fill="#0b0f17" />
                  <rect
                    x={side === 0 ? (on ? x + 116 : x + 102) : on ? x + 16 : x + 30}
                    y={y + 16}
                    width="14"
                    height="16"
                    rx="2"
                    fill={on ? "#cfd8e6" : "#ffb85c"}
                  />
                  <rect
                    x={side === 0 ? x + 12 : x + 62}
                    y={y + 18}
                    width="66"
                    height="4"
                    rx="2"
                    fill="#8ea0bd"
                    opacity=".35"
                  />
                  <rect
                    x={side === 0 ? x + 12 : x + 62}
                    y={y + 27}
                    width="40"
                    height="3"
                    rx="1.5"
                    fill="#8ea0bd"
                    opacity=".2"
                  />
                </g>
              );
            })}
          </g>
        );
      })}
      {/* tripped indicator glow */}
      <circle cx="350" cy="590" r="40" fill="#ffb85c" opacity=".18" filter={`url(#${u}-blur)`} />
      {/* rim light */}
      <path d="M180 150 V890" stroke="#6fdcff" strokeOpacity=".5" strokeWidth="2" />
      <path d="M182 140 H618" stroke="#a9c4ff" strokeOpacity=".25" strokeWidth="2" />
      {/* floor gradient */}
      <rect y="860" width="800" height="140" fill="#02050c" opacity=".6" />
    </Frame>
  );
}

/* ---------- Pendant lighting over a counter ---------- */
export function PendantScene(p: SceneProps) {
  const u = p.uid;
  const lamps = [200, 400, 600];
  return (
    <Frame {...p}>
      <defs>
        <linearGradient id={`${u}-room`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#060b17" />
          <stop offset=".7" stopColor="#0d1a33" />
          <stop offset="1" stopColor="#070d1b" />
        </linearGradient>
        <radialGradient id={`${u}-warm`} cx=".5" cy="0" r="1">
          <stop offset="0" stopColor="#ffd9a0" stopOpacity=".9" />
          <stop offset=".35" stopColor="#ffb661" stopOpacity=".25" />
          <stop offset="1" stopColor="#ffb661" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${u}-shade`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#141b29" />
          <stop offset=".5" stopColor="#2a3446" />
          <stop offset="1" stopColor="#111724" />
        </linearGradient>
        <linearGradient id={`${u}-counter`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9e2ef" stopOpacity=".18" />
          <stop offset="1" stopColor="#0a1120" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill={`url(#${u}-room)`} />
      {/* back wall panels */}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={i * 100} x2={i * 100} y1="0" y2="760" stroke="#9fb6dd" strokeOpacity=".03" />
      ))}
      {lamps.map((x) => (
        <g key={x}>
          <path d={`M${x - 160} 760 L${x - 34} 455 L${x + 34} 455 L${x + 160} 760 Z`} fill={`url(#${u}-warm)`} opacity=".55" />
          <line x1={x} x2={x} y1="0" y2="380" stroke="#4b5870" strokeWidth="2" />
          <rect x={x - 6} y="372" width="12" height="20" rx="2" fill="#2c3546" />
          <path d={`M${x - 70} 455 Q${x - 60} 392 ${x} 390 Q${x + 60} 392 ${x + 70} 455 Z`} fill={`url(#${u}-shade)`} />
          <path d={`M${x - 70} 455 Q${x - 60} 392 ${x} 390`} stroke="#8fd8ff" strokeOpacity=".35" strokeWidth="2" fill="none" />
          <ellipse cx={x} cy="456" rx="70" ry="9" fill="#ffe2b5" />
          <ellipse cx={x} cy="470" rx="90" ry="40" fill="#ffd28a" opacity=".45" filter={`url(#${u}-blur)`} />
        </g>
      ))}
      {/* counter */}
      <rect x="0" y="760" width="800" height="16" fill="#cfd8e6" opacity=".22" />
      <rect x="0" y="776" width="800" height="224" fill="#060b16" />
      <rect x="0" y="776" width="800" height="120" fill={`url(#${u}-counter)`} />
      {lamps.map((x) => (
        <ellipse key={x} cx={x} cy="768" rx="120" ry="10" fill="#ffd8a0" opacity=".35" filter={`url(#${u}-soft)`} />
      ))}
      {/* cabinet lines */}
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} x={i * 170 + 15} y="800" width="150" height="200" fill="none" stroke="#9fb6dd" strokeOpacity=".07" />
      ))}
    </Frame>
  );
}

/* ---------- Commercial ceiling with recessed panel lights ---------- */
export function CeilingScene(p: SceneProps) {
  const u = p.uid;
  const vx = 400;
  const vy = 600; // horizon
  const ceil = 560; // height of ceiling plane above the horizon, at depth 1
  const depths = [1, 1.45, 2.1, 3, 4.3, 6.2, 9];
  const cols = [-2, -1, 0, 1, 2];
  return (
    <Frame {...p}>
      <defs>
        <linearGradient id={`${u}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1830" />
          <stop offset=".6" stopColor="#13285a" />
          <stop offset="1" stopColor="#050912" />
        </linearGradient>
        <radialGradient id={`${u}-vp`} cx=".5" cy=".6" r=".45">
          <stop offset="0" stopColor="#8fe4ff" stopOpacity=".45" />
          <stop offset="1" stopColor="#8fe4ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${u}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a2c55" />
          <stop offset="1" stopColor="#03060d" />
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill={`url(#${u}-bg)`} />
      {/* ceiling grid: rows */}
      {depths.map((z) => (
        <line key={`r${z}`} x1="0" x2="800" y1={vy - ceil / z} y2={vy - ceil / z} stroke="#9fb6dd" strokeOpacity={0.05 + 0.1 / z} />
      ))}
      {/* ceiling grid: columns converging */}
      {[-3, -2.5, -1.5, -0.5, 0.5, 1.5, 2.5, 3].map((c) => (
        <line key={`c${c}`} x1={vx + c * 230} y1={vy - ceil} x2={vx} y2={vy} stroke="#9fb6dd" strokeOpacity=".06" />
      ))}
      {/* light panels */}
      {depths.slice(0, -1).map((z, i) =>
        cols.map((c) => {
          const zFar = depths[i + 1];
          const zMid = (z + zFar) / 2;
          const yNear = vy - ceil / (z + (zMid - z) * 0.25);
          const yFar = vy - ceil / (zMid + (zFar - zMid) * 0.2);
          const half = 70;
          const xn = (x: number, zz: number) => vx + x / zz;
          const zn = z + (zMid - z) * 0.25;
          const zf = zMid + (zFar - zMid) * 0.2;
          const pts = [
            [xn(c * 230 - half, zn), yNear],
            [xn(c * 230 + half, zn), yNear],
            [xn(c * 230 + half, zf), yFar],
            [xn(c * 230 - half, zf), yFar],
          ]
            .map((pt) => pt.join(","))
            .join(" ");
          return (
            <g key={`${z}-${c}`}>
              <polygon points={pts} fill="#bff3ff" opacity={0.25} filter={`url(#${u}-soft)`} />
              <polygon points={pts} fill="#f2fdff" opacity={0.95 - i * 0.1} />
            </g>
          );
        })
      )}
      <rect width="800" height="1000" fill={`url(#${u}-vp)`} />
      {/* floor */}
      <rect y={vy} width="800" height={1000 - vy} fill={`url(#${u}-floor)`} />
      {[-3, -1.5, 0, 1.5, 3].map((c) => (
        <line key={`f${c}`} x1={vx} y1={vy} x2={vx + c * 300} y2="1000" stroke="#6fdcff" strokeOpacity=".07" />
      ))}
      {/* reflections */}
      {cols.map((c) => (
        <ellipse key={`e${c}`} cx={vx + (c * 230) / 1.6} cy={vy + 140} rx="40" ry="90" fill="#bff3ff" opacity=".08" filter={`url(#${u}-blur)`} />
      ))}
      <rect y={vy - 2} width="800" height="3" fill="#8fe4ff" opacity=".25" />
    </Frame>
  );
}

/* ---------- Duplex outlet close-up ---------- */
export function OutletScene(p: SceneProps) {
  const u = p.uid;
  return (
    <Frame {...p}>
      <defs>
        <linearGradient id={`${u}-wall`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#13213d" />
          <stop offset="1" stopColor="#070c18" />
        </linearGradient>
        <linearGradient id={`${u}-plate`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4f7fb" />
          <stop offset="1" stopColor="#c3ccd9" />
        </linearGradient>
        <linearGradient id={`${u}-rec`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d6dde8" />
        </linearGradient>
        <radialGradient id={`${u}-rim`} cx=".85" cy=".15" r=".9">
          <stop offset="0" stopColor="#3d7bff" stopOpacity=".55" />
          <stop offset="1" stopColor="#3d7bff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="1000" fill={`url(#${u}-wall)`} />
      <rect width="800" height="1000" fill={`url(#${u}-rim)`} />
      <rect x="250" y="250" width="320" height="520" rx="26" fill="#000" opacity=".6" filter={`url(#${u}-blur)`} />
      <rect x="240" y="230" width="320" height="520" rx="26" fill={`url(#${u}-plate)`} />
      <rect x="240" y="230" width="320" height="520" rx="26" fill="none" stroke="#8fd8ff" strokeOpacity=".6" strokeWidth="2" />
      {[330, 530].map((cy) => (
        <g key={cy}>
          <rect x="310" y={cy - 70} width="180" height="140" rx="60" fill={`url(#${u}-rec)`} stroke="#b7c1d0" strokeWidth="2" />
          <rect x="358" y={cy - 32} width="12" height="40" rx="3" fill="#1c2330" />
          <rect x="430" y={cy - 32} width="12" height="48" rx="3" fill="#1c2330" />
          <path d={`M388 ${cy + 30} a12 12 0 0 1 24 0 v14 h-24 Z`} fill="#1c2330" />
        </g>
      ))}
      <circle cx="400" cy="430" r="11" fill="#c3ccd9" stroke="#98a3b5" />
      <line x1="393" y1="430" x2="407" y2="430" stroke="#6d788b" strokeWidth="2.5" />
      {/* cyan status hint */}
      <circle cx="640" cy="160" r="90" fill="#6fdcff" opacity=".12" filter={`url(#${u}-blur)`} />
    </Frame>
  );
}

/* ---------- Exterior lighting at dusk ---------- */
export function ExteriorScene(p: SceneProps) {
  const u = p.uid;
  return (
    <Frame {...p}>
      <defs>
        <linearGradient id={`${u}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#050a18" />
          <stop offset=".6" stopColor="#14306b" />
          <stop offset="1" stopColor="#1f4fb0" />
        </linearGradient>
        <radialGradient id={`${u}-sconce`} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffd9a0" stopOpacity=".95" />
          <stop offset="1" stopColor="#ffb661" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="1000" fill={`url(#${u}-sky)`} />
      {/* house */}
      <path d="M60 1000 V520 L400 300 L740 520 V1000 Z" fill="#070c18" />
      <path d="M60 520 L400 300 L740 520" stroke="#6fdcff" strokeOpacity=".35" strokeWidth="2" fill="none" />
      {/* windows */}
      {[
        [150, 600],
        [530, 600],
      ].map(([x, y]) => (
        <g key={x}>
          <rect x={x} y={y} width="120" height="150" fill="#ffcf8a" opacity=".14" />
          <rect x={x} y={y} width="120" height="150" fill="none" stroke="#ffcf8a" strokeOpacity=".3" />
          <line x1={x + 60} x2={x + 60} y1={y} y2={y + 150} stroke="#070c18" strokeWidth="4" />
        </g>
      ))}
      {/* door */}
      <rect x="350" y="680" width="100" height="220" fill="#0e1628" stroke="#9fb6dd" strokeOpacity=".15" />
      {/* sconces */}
      {[310, 490].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy="720" rx="90" ry="140" fill={`url(#${u}-sconce)`} opacity=".55" />
          <rect x={x - 10} y="700" width="20" height="34" rx="4" fill="#ffe7c2" />
        </g>
      ))}
      {/* path lights */}
      {[180, 260, 540, 620].map((x, i) => (
        <g key={x}>
          <ellipse cx={x} cy={940 - i * 0} rx="60" ry="22" fill="#ffd28a" opacity=".3" filter={`url(#${u}-soft)`} />
          <rect x={x - 4} y="900" width="8" height="40" fill="#1a2335" />
          <rect x={x - 10} y="894" width="20" height="8" rx="2" fill="#ffe7c2" />
        </g>
      ))}
      <rect y="940" width="800" height="60" fill="#03060d" opacity=".85" />
    </Frame>
  );
}

export function Scene({ kind, ...p }: SceneProps & { kind: "panel" | "pendants" | "ceiling" | "outlet" | "exterior" }) {
  switch (kind) {
    case "panel":
      return <PanelScene {...p} />;
    case "pendants":
      return <PendantScene {...p} />;
    case "ceiling":
      return <CeilingScene {...p} />;
    case "outlet":
      return <OutletScene {...p} />;
    case "exterior":
      return <ExteriorScene {...p} />;
  }
}
