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
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <header className="text-center py-6">
        <h1 className="text-2xl font-semibold tracking-widest uppercase text-slate-300">
          World Clock
        </h1>
      </header>

      <div className="flex justify-center items-end gap-12 pb-8">
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs text-slate-500 tracking-widest uppercase">prev</span>
          <AnalogClock size="small" {...prev} />
          <span className="text-sm text-slate-400">{formatOffset(activeOffset - 60)}</span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <AnalogClock size="large" {...main} activeOffset={activeOffset} onOffsetChange={setActiveOffset} />
          <span className="text-lg font-semibold text-white">{formatOffset(activeOffset)}</span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <span className="text-xs text-slate-500 tracking-widest uppercase">next</span>
          <AnalogClock size="small" {...next} />
          <span className="text-sm text-slate-400">{formatOffset(activeOffset + 60)}</span>
        </div>
      </div>

      <div className="flex-1 px-4 pb-6">
        <WorldMap activeOffset={activeOffset} onOffsetChange={setActiveOffset} />
      </div>
    </div>
  );
};
