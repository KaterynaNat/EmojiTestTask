"use client";

import { EmotionItem } from "@/types/emotion";
import styles from "./EmotionCard.module.css";

const bgClass: Record<string, string> = {
  Joy: styles.y,
  Sadness: styles.b,
  Anger: styles.r,
  Surprise: styles.p,
  Nervous: styles.g,
  Irritation: styles.o,
  Gloom: styles.d,
  Sleepiness: styles.v,
  Other: styles.gray,
};

const emojiFor = (t: string) =>
  t === "Joy"
    ? "😊"
    : t === "Sadness"
    ? "😔"
    : t === "Anger"
    ? "😤"
    : t === "Surprise"
    ? "😮"
    : t === "Nervous"
    ? "😰"
    : t === "Irritation"
    ? "😣"
    : t === "Gloom"
    ? "🌧️"
    : t === "Sleepiness"
    ? "😴"
    : "🫧";

type Props = { item: EmotionItem; onRemove?: () => void };

export default function EmotionCard({ item, onRemove }: Props) {
  return (
    <div className={`${styles.card} ${bgClass[item.type] ?? styles.gray}`}>
      {}
      <div className={styles.top}>
        <button
          type="button"
          className={styles.delBtn}
          aria-label="Remove"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove?.();
          }}
        >
          ×
        </button>
      </div>

      {}
      <div className={styles.media} />

      {}
      <div className={styles.bottom}>
        <span className={styles.emoji}>{emojiFor(item.type)}</span>
        <p className={styles.comment}>{item.comment || "—"}</p>
      </div>
    </div>
  );
}
