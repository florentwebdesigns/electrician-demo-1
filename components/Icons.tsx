import type { SVGProps } from "react";
import type { IconName } from "@/content/site";

type Props = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, children, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const PhoneIcon = (p: Props) => (
  <Svg {...p}>
    <path d="M5 4h3.2l1.6 4-2.1 1.3a11 11 0 0 0 5 5l1.3-2.1 4 1.6V17a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </Svg>
);

export const ArrowIcon = (p: Props) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const CheckIcon = (p: Props) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
);

export const PlusIcon = (p: Props) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const CloseIcon = (p: Props) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const MenuIcon = (p: Props) => (
  <Svg {...p}>
    <path d="M4 8h16M4 16h16" />
  </Svg>
);

export const AlertIcon = (p: Props) => (
  <Svg {...p}>
    <path d="M12 3 2.5 20h19L12 3Z" />
    <path d="M12 10v4.5M12 17.5v.01" />
  </Svg>
);

export const PinIcon = (p: Props) => (
  <Svg {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Svg>
);

export const QuoteIcon = (p: Props) => (
  <svg
    width={p.size ?? 48}
    height={p.size ?? 48}
    viewBox="0 0 48 48"
    aria-hidden="true"
    focusable="false"
    className={p.className}
  >
    <path
      fill="currentColor"
      d="M8 34c0-9.6 4.6-17.2 13-21l2 3.6c-5 2.6-7.6 6.2-8 10.4h7v13H8V34Zm19 0c0-9.6 4.6-17.2 13-21l2 3.6c-5 2.6-7.6 6.2-8 10.4h7v13H27V34Z"
    />
  </svg>
);

const serviceIcons: Record<IconName, React.ReactNode> = {
  home: (
    <>
      <path d="M3.5 11 12 4l8.5 7" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="m12.6 11-2.2 3.6h3.2L11.4 18" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 17.5h6M10 20.5h4" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 17a8 8 0 1 1 16 0" />
      <path d="m12 17 4-5.5" />
      <path d="M7 17h.01M17 17h.01M12 9v.01" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5l8-2v18M12 8h8v13" />
      <path d="M7 8h2M7 12h2M7 16h2M15 12h2M15 16h2M2.5 21h19" />
    </>
  ),
};

export function ServiceIcon({ name, ...p }: Props & { name: IconName }) {
  return <Svg {...p}>{serviceIcons[name]}</Svg>;
}
