"use client";

import { observer } from "mobx-react-lite";
import { emotionsStore } from "@/stores/emotions.store";
import styles from "./StatsTab.module.css";

const emojiFor = (t: string) =>
  t === "Joy" ? "😊" :
  t === "Sadness" ? "😔" :
  t === "Anger" ? "😤" :
  t === "Surprise" ? "😮" :
  t === "Nervous" ? "😰" :
  t === "Irritation" ? "😣" :
  t === "Gloom" ? "🌧️" :
  t === "Sleepiness" ? "😴" : "🫧";

function StatsTabInner() {
  const stats = emotionsStore.statsByType;
  const total = Object.values(stats).reduce((a, b) => a + b, 0);

  return (
    <div className={styles.stats}>
      <h2 className={styles.title}>📊 Statistics</h2>
      {total === 0 ? (
        <p className={styles.empty}>No data yet.</p>
      ) : (
        <ul className={styles.list}>
          {Object.entries(stats).map(([type, count]) => (
            <li key={type} className={styles.item}>
              <span className={styles.emoji}>{emojiFor(type)}</span>
              <span className={styles.label}>{type}</span>
              <span className={styles.value}>{count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const StatsTab = observer(StatsTabInner);
