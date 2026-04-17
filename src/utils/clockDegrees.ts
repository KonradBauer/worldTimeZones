export const getClockDegrees = (offsetMinutes: number, now: Date) => {
  const localMs = now.getTime() + offsetMinutes * 60000;
  const d = new Date(localMs);
  const h = d.getUTCHours() % 12;
  const m = d.getUTCMinutes();
  const s = d.getUTCSeconds();
  return {
    hourDeg: h * 30 + m * 0.5,
    minuteDeg: m * 6 + s * 0.1,
    secondDeg: s * 6,
  };
};
