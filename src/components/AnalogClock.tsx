import { useRef } from "react";
import { useDragHourHand } from "../hooks/useDragHourHand";

interface AnalogClockProps {
  hourDeg?: number;
  minuteDeg?: number;
  secondDeg?: number;
  size?: "large" | "small";
  activeOffset?: number;
  onOffsetChange?: (offset: number) => void;
}

export const AnalogClock = ({
  hourDeg = 0,
  minuteDeg = 0,
  secondDeg = 0,
  size = "large",
  activeOffset = 0,
  onOffsetChange,
}: AnalogClockProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const className = size === "large"
    ? "w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80"
    : "w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44";
  const { onMouseDown } = useDragHourHand(
    activeOffset,
    onOffsetChange ?? (() => {}),
  );
  const draggable = !!onOffsetChange;

  return (
    <svg ref={svgRef} viewBox="0 0 200 200" className={className}>
      <circle cx="100" cy="100" r="97" fill="#0f1e30" stroke="#1e3a55" strokeWidth="2" />

      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const isMajor = i % 3 === 0;
        return (
          <line
            key={i}
            x1={100 + Math.sin(angle) * 88}
            y1={100 - Math.cos(angle) * 88}
            x2={100 + Math.sin(angle) * (isMajor ? 76 : 82)}
            y2={100 - Math.cos(angle) * (isMajor ? 76 : 82)}
            stroke={isMajor ? "rgba(210,230,255,0.85)" : "rgba(160,190,230,0.4)"}
            strokeWidth={isMajor ? 2.5 : 1.2}
            strokeLinecap="round"
          />
        );
      })}

      <line
        x1="100" y1="107"
        x2="100" y2="44"
        stroke="rgba(235,245,255,0.95)"
        strokeWidth="5"
        strokeLinecap="round"
        transform={`rotate(${hourDeg}, 100, 100)`}
        style={{
          transition: draggable ? "none" : size === "large" ? "transform 0.3s ease" : "none",
          cursor: draggable ? "grab" : "default",
        }}
        onMouseDown={draggable ? (e) => onMouseDown(e, svgRef.current!) : undefined}
      />

      <line
        x1="100" y1="110"
        x2="100" y2="20"
        stroke="rgba(210,228,255,0.8)"
        strokeWidth="2.5"
        strokeLinecap="round"
        transform={`rotate(${minuteDeg}, 100, 100)`}
        style={{ transition: size === "large" ? "transform 0.3s ease" : "none" }}
      />

      <line
        x1="100" y1="118"
        x2="100" y2="16"
        stroke="#f0633a"
        strokeWidth="1.2"
        strokeLinecap="round"
        transform={`rotate(${secondDeg}, 100, 100)`}
      />

      <circle cx="100" cy="100" r="4" fill="#1e3a55" stroke="rgba(210,228,255,0.5)" strokeWidth="1" />
    </svg>
  );
};
