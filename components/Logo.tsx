type Props = { className?: string };

/** Wordmark: a "W" drawn as a single circuit trace with terminal nodes. */
export function LogoMark({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7fe7ff" />
          <stop offset="1" stopColor="#2f6bff" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="9" fill="#0a1328" stroke="url(#logo-g)" strokeOpacity=".55" />
      <path
        d="M9 12 L14.5 28 L20 17 L25.5 28 L31 12"
        fill="none"
        stroke="url(#logo-g)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="12" r="2.2" fill="#7fe7ff" />
      <circle cx="31" cy="12" r="2.2" fill="#2f6bff" />
    </svg>
  );
}

export function Logo({ className }: Props) {
  return (
    <span className={`logo ${className ?? ""}`}>
      <LogoMark className="logo__mark" />
      <span className="logo__type">
        <span className="logo__top">W Sincinnati</span>
        <span className="logo__bottom">Electrical</span>
      </span>
    </span>
  );
}
