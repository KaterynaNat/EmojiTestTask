export type EmotionType =
  | "Joy"
  | "Sadness"
  | "Anger"
  | "Surprise"
  | "Calm"
  | "Other";

export interface EmotionItem {
  id: string;
  type: EmotionType;
  comment: string;
  createdAt: number;
  order: number;
}
