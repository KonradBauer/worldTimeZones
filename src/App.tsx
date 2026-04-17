import { useState } from "react";
import { AnalogClock } from "./components/AnalogClock";
import { WorldMap } from "./components/WorldMap";
import { useTime } from "./hooks/useTime";
import { getClockDegrees } from "./utils/clockDegrees";
import { formatOffset } from "./utils/formatOffset";

export const App = () => {
  const [activeOffset, setActiveOffset] = useState(
    new Date().getTimezoneOffset() * -1,
  );
  const now = useTime();

  const main = getClockDegrees(activeOffset, now);
  const prev = getClockDegrees(activeOffset - 60, now);
  const next = getClockDegrees(activeOffset + 60, now);

  return (
    <div className="h-screen bg-slate-900 text-white flex flex-col overflow-hidden">
      <header className="text-center pt-4 pb-2 shrink-0">
        <h1 className="text-lg font-semibold tracking-widest uppercase text-slate-400">
          World Clock
        </h1>
      </header>

      <div className="flex flex-col items-center gap-4 py-4 shrink-0 md:flex-row md:justify-center md:gap-12">
        <div className="hidden md:flex flex-col items-center gap-2">
          <AnalogClock size="small" {...prev} />
          <div className="text-2xl text-slate-300">{formatOffset(activeOffset - 60)}</div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <AnalogClock size="large" {...main} activeOffset={activeOffset} onOffsetChange={setActiveOffset} />
          <div className="text-3xl font-semibold text-white">{formatOffset(activeOffset)}</div>
        </div>

        <div className="hidden md:flex flex-col items-center gap-2">
          <AnalogClock size="small" {...next} />
          <div className="text-2xl text-slate-300">{formatOffset(activeOffset + 60)}</div>
        </div>

        <div className="flex md:hidden justify-center gap-10">
          <div className="flex flex-col items-center gap-2">
            <AnalogClock size="small" {...prev} />
            <div className="text-lg text-slate-300">{formatOffset(activeOffset - 60)}</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <AnalogClock size="small" {...next} />
            <div className="text-lg text-slate-300">{formatOffset(activeOffset + 60)}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 px-2 sm:px-6 pb-4">
        <WorldMap activeOffset={activeOffset} onOffsetChange={setActiveOffset} />
      </div>
    </div>
  );
};
