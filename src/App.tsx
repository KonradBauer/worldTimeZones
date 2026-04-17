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
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <header className="text-center pt-8 pb-4">
        <h1 className="text-xl font-semibold tracking-widest uppercase text-slate-400">
          World Clock
        </h1>
      </header>

      <div className="flex justify-center items-center gap-16 py-8">
        <div className="flex flex-col items-center gap-4">
          <AnalogClock size="small" {...prev} />
          <div className="text-center">
            <div className="text-3xl text-slate-500 uppercase tracking-widest mb-1"></div>
            <div className="text-4xl text-slate-300">
              {formatOffset(activeOffset - 60)}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <AnalogClock
            size="large"
            {...main}
            activeOffset={activeOffset}
            onOffsetChange={setActiveOffset}
          />
          <div className="text-4xl font-semibold text-white">
            {formatOffset(activeOffset)}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <AnalogClock size="small" {...next} />
          <div className="text-center">
            <div className="text-sm text-slate-500 uppercase tracking-widest mb-1">
              next
            </div>
            <div className="text-4xl text-slate-300">
              {formatOffset(activeOffset + 60)}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-8">
        <WorldMap
          activeOffset={activeOffset}
          onOffsetChange={setActiveOffset}
        />
      </div>
    </div>
  );
};
