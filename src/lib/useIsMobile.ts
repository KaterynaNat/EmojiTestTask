"use client";
import { useEffect, useState } from "react";
export function useIsMobile(query = "(max-width: 767.98px)") {
  const [isMobile, set] = useState<boolean>(() =>
    typeof window === "undefined" ? true : window.matchMedia(query).matches
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(query);
    const on = (e: MediaQueryListEvent) => set(e.matches);
    set(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return isMobile;
}
