"use client";

import { observer } from "mobx-react-lite";
import { emotionsStore, type PeriodFilter } from "@/src/stores/emotions.store";
import styles from "./Filters.module.css";

const FILTERS: ReadonlyArray<{ key: PeriodFilter; label: string }> = [
  { key: "ALL", label: "All" },
  { key: "TODAY", label: "Today" },
  { key: "WEEK", label: "Week" },
  { key: "MONTH", label: "Month" },
];

function FiltersInner() {
  return (
    <div className={styles.wrap}>
      <div className={styles.group}>
        {FILTERS.map((f) => (
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

const Filters = observer(FiltersInner);
Filters.displayName = "Filters";

export default Filters;
