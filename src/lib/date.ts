import { isSameDay, subDays, isAfter } from "date-fns";

export const inToday = (ts: number) => isSameDay(new Date(ts), new Date());
export const inLastDays = (ts: number, days: number) =>
  isAfter(new Date(ts), subDays(new Date(), days));
