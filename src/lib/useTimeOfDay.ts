"use client";

import { useEffect, useState } from "react";

/** morning: 05:00–10:59, day: 11:00–16:59, evening: 17:00–04:59 */
export type TimeOfDay = "morning" | "day" | "evening";

function calc(): TimeOfDay {
  const h = new Date().getHours();
  if (h >= 5 && h < 11) return "morning";
  if (h >= 11 && h < 17) return "day";
  return "evening";
}

export function useTimeOfDay(pollMs = 60_000) {
  const [tod, setTod] = useState<TimeOfDay>(calc);

  useEffect(() => {
    const id = setInterval(() => {
      const next = calc();
      setTod((prev) => (prev === next ? prev : next));
    }, pollMs);
    return () => clearInterval(id);
  }, [pollMs]);

  return tod;
}
