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
  const dim = size === "large" ? 820 : 480;
  const svgRef = useRef<SVGSVGElement>(null);
  const { onMouseDown } = useDragHourHand(
    activeOffset,
    onOffsetChange ?? (() => {}),
  );
  const draggable = !!onOffsetChange;

  return (
    <svg ref={svgRef} viewBox="0 0 200 200" width={dim} height={dim}>
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="white"
        stroke="#222"
        strokeWidth="3"
      />

      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const isMajor = i % 3 === 0;
        return (
          <line
            key={i}
            x1={100 + Math.sin(angle) * 88}
            y1={100 - Math.cos(angle) * 88}
            x2={100 + Math.sin(angle) * (isMajor ? 75 : 82)}
            y2={100 - Math.cos(angle) * (isMajor ? 75 : 82)}
            stroke="#222"
            strokeWidth={isMajor ? 3 : 1.5}
            strokeLinecap="round"
          />
        );
      })}

      <line
        x1="100"
        y1="100"
        x2="100"
        y2="45"
        stroke="#222"
        strokeWidth="5"
        strokeLinecap="round"
        transform={`rotate(${hourDeg}, 100, 100)`}
        style={{
          transition: draggable ? "none" : "transform 0.3s ease",
          cursor: draggable ? "grab" : "default",
        }}
        onMouseDown={
          draggable
            ? (e) => onMouseDown(e as never, svgRef.current!)
            : undefined
        }
      />

      <line
        x1="100"
        y1="100"
        x2="100"
        y2="22"
        stroke="#222"
        strokeWidth="3"
        strokeLinecap="round"
        transform={`rotate(${minuteDeg}, 100, 100)`}
        style={{ transition: "transform 0.3s ease" }}
      />

      <line
        x1="100"
        y1="115"
        x2="100"
        y2="18"
        stroke="#e03030"
        strokeWidth="1.5"
        strokeLinecap="round"
        transform={`rotate(${secondDeg}, 100, 100)`}
      />

      <circle cx="100" cy="100" r="4" fill="#222" />
    </svg>
  );
};
