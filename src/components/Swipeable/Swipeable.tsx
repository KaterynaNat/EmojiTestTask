"use client";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import styles from "./Swipeable.module.css";

export default function Swipeable({
  onSwipedLeft,
  children,
}: {
  onSwipedLeft: () => void;
  children: React.ReactNode;
}) {
  const [offset, setOffset] = useState(0);
  const handlers = useSwipeable({
    onSwiping(e) {
      setOffset(Math.min(0, e.deltaX));
    },
    onSwipedLeft() {
      setOffset(0);
      onSwipedLeft();
    },
    onSwiped() {
      setOffset(0);
    },
    trackTouch: true,
    delta: 30,
  });

  return (
    <div {...handlers} className={styles.wrap}>
      <div className={styles.delete}>Remove</div>
      <div
        className={styles.content}
        style={{ transform: `translateX(${offset}px)` }}
      >
        {children}
      </div>
    </div>
  );
}
