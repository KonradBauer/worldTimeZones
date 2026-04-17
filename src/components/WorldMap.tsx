import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { countryTimezones } from "../utils/countryTimezones";

interface WorldMapProps {
  activeOffset: number;
}

const getTimezoneOffset = (tz: string): number => {
  const now = new Date();
  const utc = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
  const local = new Date(now.toLocaleString("en-US", { timeZone: tz }));
  return Math.round((local.getTime() - utc.getTime()) / 60000);
};

export const WorldMap = ({ activeOffset }: WorldMapProps) => {
  return (
    <ComposableMap
      width={800}
      height={400}
      style={{ width: "100%", height: "auto" }}
    >
      <Geographies geography="/world.json">
        {({ geographies }) =>
          geographies.map((geo) => {
            const tz = countryTimezones[geo.id];
            const offset = tz ? getTimezoneOffset(tz) : undefined;
            const isActive = offset !== undefined && offset === activeOffset;
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={isActive ? "#3b82f6" : "#d1d5db"}
                stroke="#fff"
                strokeWidth={0.4}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};
