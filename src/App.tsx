import { useState } from "react";
import { AnalogClock } from "./components/AnalogClock";
import { WorldMap } from "./components/WorldMap";
import { useTime } from "./hooks/useTime";
import { getClockDegrees } from "./utils/clockDegrees";
import { formatOffset } from "./utils/formatOffset";

export const App = () => {
  const [activeOffset, setActiveOffset] = useState(
    new Date().getTimezoneOffset() * -1
  );
  const now = useTime();

  const main = getClockDegrees(activeOffset, now);
  const prev = getClockDegrees(activeOffset - 60, now);
  const next = getClockDegrees(activeOffset + 60, now);

  return (
    <div>
      <div className="flex justify-center gap-10 items-center">
        <div className="flex flex-col items-center gap-2">
          <AnalogClock size="small" {...prev} />
          <span className="text-sm text-gray-500">{formatOffset(activeOffset - 60)}</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <AnalogClock size="large" {...main} activeOffset={activeOffset} onOffsetChange={setActiveOffset} />
          <span className="text-base font-semibold">{formatOffset(activeOffset)}</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <AnalogClock size="small" {...next} />
          <span className="text-sm text-gray-500">{formatOffset(activeOffset + 60)}</span>
        </div>
      </div>
      <WorldMap activeOffset={activeOffset} onOffsetChange={setActiveOffset} />
    </div>
  );
};
