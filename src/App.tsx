"use client";

import { observer } from "mobx-react-lite";
import AddEmotionButton from "@/src/components/AddEmotionButton/AddEmotionButton";
import Filters from "@/src/components/Filters/Filters";
import Grid from "@/src/components/Grid/Grid";
import BoardList from "@/src/components/BoardList/BoardList";
import styles from "./App.module.css";

function AppInner() {
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
        <small>LocalStorage • MobX • Swipe/Drag&Drop</small>
      </footer>
    </div>
  );
}

const App = observer(AppInner);
App.displayName = "App";

export default App;
