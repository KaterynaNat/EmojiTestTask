"use client";

import { useEffect, useRef, useState } from "react";
import { EmotionItem } from "@/types/emotion";
import { emotionsStore } from "@/stores/emotions.store";
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

type Props = {
  item: EmotionItem;
  onRemove?: () => void;
};

export default function EmotionCard({ item, onRemove }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(item.comment ?? "");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      const el = inputRef.current;
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    }
  }, [editing]);

  const commit = () => {
    const next = value.trim();
    if (next !== (item.comment ?? ""))
      emotionsStore.updateComment(item.id, next);
    setEditing(false);
  };

  const cancel = () => {
    setValue(item.comment ?? "");
    setEditing(false);
  };

  return (
    <div
      className={[
        styles.card,
        bgClass[item.type] ?? styles.gray,
        emotionsStore.isJustAdded?.(item.id) ? styles.added : "",
      ].join(" ")}
    >
      <div className={styles.top}>
        <span className={styles.badge} data-nodrag>
          {item.type}
        </span>

        <button
          type="button"
          className={styles.delBtn}
          aria-label="Remove"
          data-nodrag
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove?.();
          }}
        >
          ×
        </button>
      </div>

      <div className={styles.media} />

      <div className={styles.bottom}>
        <span className={styles.emoji}>{emojiFor(item.type)}</span>

        {!editing ? (
          <p
            className={styles.comment}
            data-nodrag
            title="Click to edit"
            onClick={(e) => {
              e.stopPropagation();
              setEditing(true);
            }}
          >
            {item.comment?.trim() ? item.comment : "—"}
          </p>
        ) : (
          <textarea
            ref={inputRef}
            className={styles.edit}
            rows={2}
            value={value}
            data-nodrag
            onChange={(e) => setValue(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                commit();
              } else if (e.key === "Escape") {
                e.preventDefault();
                cancel();
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
