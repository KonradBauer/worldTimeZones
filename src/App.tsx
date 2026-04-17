import { useState } from "react";
import { AnalogClock } from "./components/AnalogClock";
import { WorldMap } from "./components/WorldMap";
import { useTime } from "./hooks/useTime";
import { getClockDegrees } from "./utils/clockDegrees";

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
        <AnalogClock size="small" {...prev} />
        <AnalogClock size="large" {...main} />
        <AnalogClock size="small" {...next} />
      </div>
      <WorldMap activeOffset={activeOffset} onOffsetChange={setActiveOffset} />
    </div>
  );
};
