"use client";

import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import styles from "./Swipeable.module.css";

export default function Swipeable({
  onSwipedLeft,
  disabled = false,
  children,
}: {
  onSwipedLeft: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const [offset, setOffset] = useState(0);

  const handlers = useSwipeable({
    onSwiping(e) {
      if (disabled) return;
      setOffset(Math.min(0, e.deltaX));
    },
    onSwipedLeft() {
      if (disabled) return;
      setOffset(0);
      onSwipedLeft();
    },
    onSwiped() {
      setOffset(0);
    },
    trackTouch: true,
    trackMouse: true,
    preventScrollOnSwipe: true,
    delta: 30,
  });

  return (
    <div {...handlers} className={styles.wrap} data-nodrag>
      <div className={styles.delete}>Remove</div>
      <div
        className={styles.content}
        data-nodrag
        style={{ transform: `translateX(${offset}px)` }}
      >
        {children}
      </div>
    </div>
  );
}
