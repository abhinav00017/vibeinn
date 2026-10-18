import type { PrintChoice, PrintSide } from "@/lib/commerce/types";

type Props = {
  side: PrintSide;
  print?: PrintChoice;
  className?: string;
};

// A flat shirt outline. The artwork is placed where it will be printed:
// big between the shoulders on the back, small on the left chest on the front.
export function ShirtPreview({ side, print, className }: Props) {
  const area =
    side === "back"
      ? { x: 160, y: 190, w: 280, h: 280 }
      : { x: 300, y: 165, w: 110, h: 110 };

  return (
    <svg
      viewBox="0 0 600 600"
      role="img"
      aria-label={`${side} preview${print ? `: ${print.name}` : ""}`}
      className={className}
    >
      <path
        d="M215 95 L130 130 L75 300 L150 325 L150 540 L450 540 L450 325 L525 300 L470 130 L385 95 Q300 150 215 95 Z"
        fill="#f9f8f5"
        stroke="#111"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {side === "front" ? (
        <path d="M215 95 Q300 190 385 95" fill="none" stroke="#111" strokeWidth="3" />
      ) : (
        <path d="M230 100 Q300 125 370 100" fill="none" stroke="#111" strokeWidth="3" />
      )}
      <path d="M150 325 L150 540 M450 325 L450 540" stroke="#111" strokeWidth="2" opacity="0.15" />
      {print ? (
        <image
          href={print.image.src}
          x={area.x}
          y={area.y}
          width={area.w}
          height={area.h}
          preserveAspectRatio="xMidYMid meet"
        />
      ) : (
        <rect
          x={area.x}
          y={area.y}
          width={area.w}
          height={area.h}
          fill="none"
          stroke="#111"
          strokeWidth="2"
          strokeDasharray="8 8"
          opacity="0.3"
        />
      )}
    </svg>
  );
}
