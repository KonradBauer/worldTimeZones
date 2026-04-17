import { AnalogClock } from "./components/AnalogClock.tsx";
import { WorldMap } from "./components/WorldMap.tsx";

export const App = () => {
  const userOffset = new Date().getTimezoneOffset() * -1;

  return (
    <div>
      <div className="flex justify-center gap-10 items-center">
        <AnalogClock size="small" />
        <AnalogClock />
        <AnalogClock size="small" />
      </div>
      <WorldMap activeOffset={userOffset} />
    </div>
  );
};
