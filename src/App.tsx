"use client";

import { observer } from "mobx-react-lite";
import AddEmotionButton from "@/components/AddEmotionButton/AddEmotionButton";
import Filters from "@/components/Filters/Filters";
import Grid from "@/components/Grid/Grid";
import BoardList from "@/components/BoardList/BoardList";
import { useHydrated } from "@/lib/useHydrated";
import styles from "./App.module.css";

function AppInner() {
  const hydrated = useHydrated();
  if (!hydrated) return <div className={styles.page} />;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Emotions Board</h1>
        <AddEmotionButton />
      </header>

      <Filters />
      <BoardList />
      <Grid />

      <footer className={styles.footer}>
        <small>Kateryna Naturkach, 2025</small>
      </footer>
    </div>
  );
}

const App = observer(AppInner);
App.displayName = "App";
export default App;
