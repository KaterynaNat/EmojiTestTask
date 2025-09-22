"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import { emotionsStore } from "@/stores/emotions.store";
import EmotionCard from "@/components/EmotionCard/EmotionCard";
import styles from "./Grid.module.css";

function GridInner() {
  const items = emotionsStore.filtered;
  return (
    <div className={styles.grid}>
      {items.map((i) => (
        <EmotionCard key={i.id} item={i} />
      ))}
    </div>
  );
}

const Grid = observer(GridInner);
Grid.displayName = "Grid";

export default Grid;
