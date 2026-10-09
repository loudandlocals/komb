// Botanical line illustrations. Stroke follows currentColor.
type Props = { className?: string };

const base = {
  viewBox: "0 0 120 160",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function Rosemary({ className }: Props) {
  const needles = [28, 44, 60, 76, 92, 108, 124];
  return (
    <svg {...base} className={className}>
      <path d="M60 152C58 110 62 60 60 14" />
      {needles.map((y, i) => (
        <g key={y}>
          <path d={`M60 ${y}c-10-4-20-12-${26 - i * 1.5}-${24 - i}`} />
          <path d={`M60 ${y}c10-4 20-12 ${26 - i * 1.5}-${24 - i}`} />
        </g>
      ))}
      <path d="M60 14c-3-4-3-8 0-11 3 3 3 7 0 11z" />
    </svg>
  );
}

export function Avocado({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M60 18c-12 0-18 14-22 34-4 18-14 30-14 50a36 36 0 0 0 72 0c0-20-10-32-14-50-4-20-10-34-22-34z" />
      <path d="M60 34c-7 0-11 10-14 24-3 14-10 24-10 40a24 24 0 0 0 48 0c0-16-7-26-10-40-3-14-7-24-14-24z" opacity=".6" />
      <circle cx="60" cy="100" r="15" />
      <path d="M52 94c3-4 8-5 12-3" opacity=".6" />
    </svg>
  );
}

export function Olive({ className }: Props) {
  const leaves = [
    [60, 40, -1], [58, 62, 1], [60, 84, -1], [62, 106, 1], [60, 126, -1],
  ] as const;
  return (
    <svg {...base} className={className}>
      <path d="M62 152C56 112 64 60 58 12" />
      {leaves.map(([x, y, dir]) => (
        <path
          key={y}
          d={`M${x} ${y}c${dir * 12} -14 ${dir * 30} -16 ${dir * 40} -10 ${dir * -8} 12 ${dir * -28} 16 ${dir * -40} 10z`}
        />
      ))}
      <ellipse cx="78" cy="74" rx="7" ry="10" transform="rotate(20 78 74)" />
      <ellipse cx="42" cy="116" rx="7" ry="10" transform="rotate(-20 42 116)" />
    </svg>
  );
}

export function Shea({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M60 150V86" />
      <path d="M60 86c-22-6-34-26-34-52 20 4 34 22 34 52z" />
      <path d="M60 86c22-6 34-26 34-52-20 4-34 22-34 52z" />
      <path d="M60 86c-8-20-8-48 0-72 8 24 8 52 0 72z" />
      <path d="M60 86V30M60 86C50 70 40 54 32 42M60 86c10-16 20-32 28-44" opacity=".5" />
      <ellipse cx="60" cy="122" rx="13" ry="17" />
      <path d="M53 114c2-3 6-5 10-4" opacity=".6" />
    </svg>
  );
}

export function Juniper({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M60 152C60 110 58 60 60 16" />
      {[36, 60, 84, 108].map((y) => (
        <g key={y}>
          <path d={`M60 ${y}l-26-14M60 ${y}l26-14M48 ${y - 6}l-8 6M72 ${y - 6}l8 6M40 ${y - 11}l-2-9M80 ${y - 11}l2-9`} />
        </g>
      ))}
      <circle cx="44" cy="124" r="6" />
      <circle cx="74" cy="132" r="6" />
      <circle cx="58" cy="140" r="6" />
    </svg>
  );
}
