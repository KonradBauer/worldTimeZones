import { ComposableMap, Geographies, Geography } from "react-simple-maps";

interface WorldMapProps {
  activeOffset: number;
  onOffsetChange: (offset: number) => void;
}

const OFFSETS = Array.from({ length: 27 }, (_, i) => i - 12);

const bandsGeoJson = {
  type: "FeatureCollection",
  features: OFFSETS.map((offset) => ({
    type: "Feature",
    properties: { offset },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [offset * 15 - 7.5, 85],
        [offset * 15 + 7.5, 85],
        [offset * 15 + 7.5, -85],
        [offset * 15 - 7.5, -85],
        [offset * 15 - 7.5, 85],
      ]],
    },
  })),
};

export const WorldMap = ({ activeOffset, onOffsetChange }: WorldMapProps) => {
  const activeHour = Math.round(activeOffset / 60);

  return (
    <ComposableMap projection="geoEquirectangular" width={800} height={400} style={{ width: "100%", height: "auto", background: "#0f172a" }}>
      <Geographies geography={bandsGeoJson}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const offset = geo.properties.offset as number;
            const isActive = offset === activeHour;
            return (
              <Geography
                key={`band-${offset}`}
                geography={geo}
                fill={isActive ? "rgba(59,130,246,0.4)" : offset % 2 === 0 ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)"}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={0.5}
                onClick={() => onOffsetChange(offset * 60)}
                style={{
                  default: { outline: "none", cursor: "pointer" },
                  hover: { outline: "none", fill: isActive ? "rgba(59,130,246,0.5)" : "rgba(59,130,246,0.15)" },
                  pressed: { outline: "none" },
                }}
              />
            );
          })
        }
      </Geographies>

      <Geographies geography="/world.json">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#334155"
              stroke="#1e293b"
              strokeWidth={0.4}
              style={{
                default: { outline: "none", pointerEvents: "none" },
                hover: { outline: "none", pointerEvents: "none" },
                pressed: { outline: "none", pointerEvents: "none" },
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
};
