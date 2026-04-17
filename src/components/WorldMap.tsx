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
    <ComposableMap projection="geoEquirectangular" width={800} height={400} style={{ width: "100%", height: "auto" }}>
      <Geographies geography={bandsGeoJson}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const offset = geo.properties.offset as number;
            const isActive = offset === activeHour;
            return (
              <Geography
                key={`band-${offset}`}
                geography={geo}
                fill={isActive ? "rgba(59,130,246,0.3)" : offset % 2 === 0 ? "rgba(200,215,230,0.15)" : "rgba(180,200,220,0.08)"}
                stroke="rgba(100,140,180,0.2)"
                strokeWidth={0.4}
                onClick={() => onOffsetChange(offset * 60)}
                style={{
                  default: { outline: "none", cursor: "pointer" },
                  hover: { outline: "none", fill: "rgba(59,130,246,0.2)" },
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
              fill="rgba(180,190,200,0.6)"
              stroke="#fff"
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
