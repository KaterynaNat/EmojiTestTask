import { EmotionItem } from "";
import { emotionsStore } from "";
import styles from "./EmotionCard.module.css";

const colorClass: Record<string, string> = {
  Joy: styles.y,
  Sadness: styles.b,
  Anger: styles.r,
  Surprise: styles.p,
  Calm: styles.g,
  Other: styles.gray,
};

export default function EmotionCard({ item }: { item: EmotionItem }) {
  return (
    <div className={`${styles.card} ${colorClass[item.type] ?? styles.gray}`}>
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
