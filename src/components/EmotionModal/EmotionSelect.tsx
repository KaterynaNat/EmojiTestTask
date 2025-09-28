"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { EmotionType } from "@/types/emotion";
import s from "./EmotionSelect.module.css";

type EmotionOption = {
  name: EmotionType;
  color: string;
};

const EMOTIONS: EmotionOption[] = [
  { name: "Joy", color: "#f5d760" },
  { name: "Sadness", color: "#62a1f4" },
  { name: "Anger", color: "#f79898" },
  { name: "Surprise", color: "#a391f5" },
  { name: "Nervous", color: "#47d38b" },
  { name: "Irritation", color: "#f3a65f" },
  { name: "Gloom", color: "#61faf8" },
  { name: "Sleepiness", color: "#97fe67" },
  { name: "Other", color: "#e780f3" },
];

export default function EmotionSelect({
  value,
  onChange,
  className,
}: {
  value: EmotionType;
  onChange: (v: EmotionType) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className={`${s.wrapper} ${className ?? ""}`} ref={ref}>
      <button
        type="button"
        className={s.trigger}
        data-open={open || undefined}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Choose emotion"
      >
        {value}
        <span className={s.chev} aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <ul className={s.menu} role="listbox">
          {EMOTIONS.map((e) => (
            <li
              key={e.name}
              role="option"
              aria-selected={e.name === value}
              className={s.item}
              style={{ "--hover": e.color } as CSSProperties}
              onClick={() => {
                onChange(e.name);
                setOpen(false);
              }}
            >
              <span className={s.swatch} />
              {e.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
