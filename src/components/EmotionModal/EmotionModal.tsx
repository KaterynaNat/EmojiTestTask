"use client";
import { useState } from "react";
import styles from "./EmotionModal.module.css";
import { emotionsStore } from "@/stores/emotions.store";
import type { EmotionType } from "@/types/emotion";

const EMOTIONS: EmotionType[] = [
  "Joy",
  "Sadness",
  "Anger",
  "Surprise",
  "Nervous",
  "Other",
];

export default function EmotionModal({ onClose }: { onClose: () => void }) {
  const [type, setType] = useState<EmotionType>("Joy");
  const [comment, setComment] = useState("");

  const submit = () => {
    emotionsStore.add(type, comment);
    onClose();
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>New emotion</h3>
          <button className={styles.icon} onClick={onClose}>
            ✕
          </button>
        </div>

        <label className={styles.label}>Emotion</label>
        <select
          className={styles.input}
          value={type}
          onChange={(e) => setType(e.target.value as EmotionType)}
        >
          {EMOTIONS.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>

        <label className={styles.label}>Notes</label>
        <textarea
          className={styles.textarea}
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="How do you feel today?"
        />

        <div className={styles.actions}>
          <button className={styles.secondary} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.primary} onClick={submit}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
