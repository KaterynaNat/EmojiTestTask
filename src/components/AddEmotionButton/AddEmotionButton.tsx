import { useState } from "react";
import styles from "./AddEmotionButton.module.css";
import EmotionModal from "";

export default function AddEmotionButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className={styles.btn} onClick={() => setOpen(true)}>
        Add emotion
      </button>
      {open && <EmotionModal onClose={() => setOpen(false)} />}
    </>
  );
}
