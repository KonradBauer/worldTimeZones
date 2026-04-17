import React, { useCallback } from "react";

export const useDragHourHand = (
  activeOffset: number,
  onOffsetChange: (offset: number) => void,
) => {
  const getAngle = (e: MouseEvent, svg: SVGSVGElement) => {
    const rect = svg.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (200 / rect.width) - 100;
    const y = (e.clientY - rect.top) * (200 / rect.height) - 100;
    return Math.atan2(x, -y) * (180 / Math.PI);
  };

  const onMouseDown = useCallback(
    (e: React.MouseEvent<SVGElement>, svg: SVGSVGElement) => {
      e.preventDefault();

      let lastAngle = getAngle(e.nativeEvent, svg);
      let currentOffset = activeOffset;

      const onMove = (ev: MouseEvent) => {
        const angle = getAngle(ev, svg);
        let delta = angle - lastAngle;
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;

        if (Math.abs(delta) >= 30) {
          const steps = Math.sign(delta);
          currentOffset += steps * 60;
          lastAngle += steps * 30;
          onOffsetChange(currentOffset);
        }
      };

      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [activeOffset, onOffsetChange],
  );

  return { onMouseDown };
};
