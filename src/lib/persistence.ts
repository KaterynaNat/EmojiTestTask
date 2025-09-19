const KEY = "emotions_v1";

export const loadEmotions = <T = unknown[]>(def: T = [] as unknown as T): T => {
  if (typeof window === "undefined") return def;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : def;
  } catch {
    return def;
  }
};

export const saveEmotions = (items: unknown) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
};
