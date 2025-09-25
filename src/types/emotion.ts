export type EmotionType =
  | "Joy"
  | "Sadness"
  | "Anger"
  | "Surprise"
  | "Nervous"
  | "Irritation"
  | "Gloom"
  | "Sleepiness"
  | "Other";
export interface EmotionItem {
  id: string;
  type: EmotionType;
  comment: string;
  createdAt: number;
  order: number;
}
