"use client";

import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import AddEmotionButton from "@/components/AddEmotionButton/AddEmotionButton";
import Filters from "@/components/Filters/Filters";
import Grid from "@/components/Grid/Grid";
import BoardList from "@/components/BoardList/BoardList";
import { StatsTab } from "@/components/StatsTab/StatsTab";
import { useHydrated } from "@/lib/useHydrated";
import { useTimeOfDay } from "@/lib/useTimeOfDay";
import { useIsMobile } from "@/lib/useIsMobile";
import styles from "./App.module.css";

const TAB_KEY = "ui_tab";

function AppInner() {
  const hydrated = useHydrated();
  const tod = useTimeOfDay();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-tod", tod);
    }
  }, [tod]);

  const initialTab = useMemo<"board" | "stats">(() => {
    if (typeof window === "undefined") return "board";
    const saved = window.localStorage.getItem(TAB_KEY);
    return saved === "stats" ? "stats" : "board";
  }, []);
  const [tab, setTab] = useState<"board" | "stats">(initialTab);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(TAB_KEY, tab);
    }
  }, [tab]);

  if (!hydrated) return <div className={styles.page} />;

  const boardPanelId = "panel-board";
  const statsPanelId = "panel-stats";
  const boardTabId = "tab-board";
  const statsTabId = "tab-stats";

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Emotions Board</h1>
        <AddEmotionButton />
      </header>

      <nav className={styles.nav} role="tablist" aria-label="Main views">
        <button
          id={boardTabId}
          role="tab"
          aria-controls={boardPanelId}
          aria-selected={tab === "board"}
          onClick={() => setTab("board")}
          className={tab === "board" ? styles.active : ""}
        >
          📋 Emotions
        </button>
        <button
          id={statsTabId}
          role="tab"
          aria-controls={statsPanelId}
          aria-selected={tab === "stats"}
          onClick={() => setTab("stats")}
          className={tab === "stats" ? styles.active : ""}
        >
          📊 Statistics
        </button>
      </nav>

      {tab === "board" ? (
        <section id={boardPanelId} role="tabpanel" aria-labelledby={boardTabId}>
          <Filters />
          {isMobile ? <BoardList /> : <Grid />}   {}
        </section>
      ) : (
        <section id={statsPanelId} role="tabpanel" aria-labelledby={statsTabId}>
          <StatsTab />
        </section>
      )}

      <footer className={styles.footer}>
        <small>Kateryna Naturkach, 2025</small>
      </footer>
    </div>
  );
}

const App = observer(AppInner);
App.displayName = "App";
export default App;
