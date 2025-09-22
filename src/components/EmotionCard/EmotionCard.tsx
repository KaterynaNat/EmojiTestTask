"use client";

import { EmotionItem } from "@/types/emotion";
import { emotionsStore } from "@/stores/emotions.store";
import styles from "./EmotionCard.module.css";

const colorClass: Record<string, string> = {
  Joy: styles.y,
  Sadness: styles.b,
  Anger: styles.r,
  Surprise: styles.p,
  Calm: styles.g,
  Irritation: styles.o,
  Gloom: styles.d,
  Sleepiness: styles.v,
  Other: styles.gray,
};

export default function EmotionCard({ item }: { item: EmotionItem }) {
  return (
    <div
      className={`${styles.card} ${colorClass[item.type] ?? styles.gray}`}
      data-emoji={
        item.type === "Joy"
          ? "😊"
          : item.type === "Sadness"
          ? "😔"
          : item.type === "Anger"
          ? "😤"
          : item.type === "Surprise"
          ? "😮"
          : item.type === "Calm"
          ? "😌"
          : item.type === "Irritation"
          ? "😣"
          : item.type === "Gloom"
          ? "🌧️"
          : item.type === "Sleepiness"
          ? "😴"
          : "🫧"
      }
    >
      <div className={styles.head}>
        <div className={styles.title}>{item.type}</div>
        <button
          className={styles.delBtn}
          onClick={() => emotionsStore.remove(item.id)}
        >
          Remove
        </button>
      </div>
      <div className={styles.comment}>{item.comment || "—"}</div>
    </div>
  );
}
