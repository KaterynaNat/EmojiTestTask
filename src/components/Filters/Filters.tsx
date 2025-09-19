import { emotionsStore, type PeriodFilter } from "@/stores/emotions.store";
import styles from "./Filters.module.css";
import { observer } from "mobx-react-lite";

const filters: { key: PeriodFilter; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "TODAY", label: "Today" },
  { key: "WEEK", label: "Week" },
  { key: "MONTH", label: "Month" },
];

export default function Filters() {
  return (
    <div className={styles.wrap}>
      <div className={styles.group}>
        {filters.map((f) => (
          <button
            key={f.key}
            className={`${styles.btn} ${
              emotionsStore.filter === f.key ? styles.active : ""
            }`}
            onClick={() => emotionsStore.setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <button
        className={styles.clear}
        onClick={() => {
          if (confirm("Remove all emotions?")) emotionsStore.clearAll();
        }}
      >
        Remove all
      </button>
    </div>
  );
}
