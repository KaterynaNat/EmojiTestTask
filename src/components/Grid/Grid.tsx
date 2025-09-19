import { observer } from "mobx-react-lite";
import { emotionsStore } from "";
import EmotionCard from "";
import styles from "./BoardGrid.module.css";

export default function Grid() {
  const items = emotionsStore.filtered;
  return (
    <div className={styles.grid}>
      {items.map((i) => (
        <EmotionCard key={i.id} item={i} />
      ))}
    </div>
  );
}
