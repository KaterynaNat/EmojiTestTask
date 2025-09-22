"use client";
import { makeAutoObservable, reaction } from "mobx";
import { EmotionItem, EmotionType } from "@/types/emotion";
import { loadEmotions, saveEmotions } from "@/lib/persistence";
import { inLastDays, inToday } from "@/lib/date";

export type PeriodFilter = "ALL" | "TODAY" | "WEEK" | "MONTH";

class EmotionsStore {
  items: EmotionItem[] = [];
  filter: PeriodFilter = "ALL";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    if (typeof window !== "undefined") {
      this.items = loadEmotions<EmotionItem[]>([]);
    }
    reaction(
      () =>
        this.items.map(({ id, type, comment, createdAt, order }) => ({
          id,
          type,
          comment,
          createdAt,
          order,
        })),
      (snapshot) => saveEmotions(snapshot)
    );
  }

  add(type: EmotionType, comment: string) {
    const now = Date.now();
    const maxOrder = this.items.length
      ? Math.max(...this.items.map((i) => i.order))
      : 0;
    this.items.push({
      id: crypto.randomUUID(),
      type,
      comment: comment.trim(),
      createdAt: now,
      order: maxOrder + 1,
    });
  }

  remove(id: string) {
    this.items = this.items.filter((i) => i.id !== id);
  }

  clearAll() {
    this.items = [];
  }

  setFilter(f: PeriodFilter) {
    this.filter = f;
  }

  reorder(idsInOrder: string[]) {
    const map = new Map(this.items.map((i) => [i.id, i]));
    this.items = idsInOrder.map((id, idx) => ({
      ...map.get(id)!,
      order: idx + 1,
    }));
  }

  get filtered() {
    const arr = [...this.items].sort((a, b) => a.order - b.order);
    if (this.filter === "TODAY") return arr.filter((i) => inToday(i.createdAt));
    if (this.filter === "WEEK")
      return arr.filter((i) => inLastDays(i.createdAt, 7));
    if (this.filter === "MONTH")
      return arr.filter((i) => inLastDays(i.createdAt, 30));
    return arr;
  }

  get statsByType(): Record<EmotionType, number> {
    return this.items.reduce((acc, it) => {
      acc[it.type] = (acc[it.type] ?? 0) + 1;
      return acc;
    }, {} as Record<EmotionType, number>);
  }
}

export const emotionsStore = new EmotionsStore();
