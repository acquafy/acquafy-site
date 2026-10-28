// components/ui/CurrencyFlag.tsx
//
// Round flags drawn as SVG: emoji flags render as plain letters ("US") on Windows.
import type { CurrencyCode } from "@/lib/currency";

export function CurrencyFlag({ code, className = "size-6" }: { code: CurrencyCode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`${className} shrink-0 rounded-full`}>
      <defs>
        <clipPath id={`flag-${code}`}>
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath={`url(#flag-${code})`}>
        {code === "USD" && (
          <>
            <rect width="24" height="24" fill="#fff" />
            {[0, 2, 4, 6, 8, 10, 12].map((i) => (
              <rect key={i} y={i * 1.85} width="24" height="1.85" fill="#d4264a" />
            ))}
            <rect width="11" height="13" fill="#2a3b94" />
          </>
        )}
        {code === "BRL" && (
          <>
            <rect width="24" height="24" fill="#1fa45a" />
            <path d="M12 4 L21 12 L12 20 L3 12 Z" fill="#f8d22a" />
            <circle cx="12" cy="12" r="4.2" fill="#2a3b94" />
          </>
        )}
        {code === "EUR" && (
          <>
            <rect width="24" height="24" fill="#2a3b94" />
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i / 12) * Math.PI * 2;
              return <circle key={i} cx={12 + Math.sin(a) * 7} cy={12 - Math.cos(a) * 7} r="1.1" fill="#f8d22a" />;
            })}
          </>
        )}
      </g>
    </svg>
  );
}
