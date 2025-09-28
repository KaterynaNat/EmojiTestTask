import { isSameDay, subDays, isWithinInterval } from "date-fns";

export const inToday = (ts: number) =>
  isSameDay(new Date(ts), new Date());

export const inLastDays = (ts: number, days: number) =>
  isWithinInterval(new Date(ts), {
    start: subDays(new Date(), days - 1),
    end: new Date(),
  });

