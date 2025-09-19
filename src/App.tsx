import { observer } from "mobx-react-lite";
import AddEmotionButton from "";
import Filters from "";
import Grid from "";
import BoardList from "";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Emotions desk</h1>
        <AddEmotionButton />
      </header>

      <Filters />

      {}
      <BoardList />
      {}
      <Grid />

      <footer className={styles.footer}>
        <small>Local storage • MobX • Swipe/drag-and-drop</small>
      </footer>
    </div>
  );
}
