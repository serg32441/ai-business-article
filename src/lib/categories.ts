import type { CategoryId } from "./types";

export const CATEGORIES: { id: CategoryId; label: string; short: string }[] = [
  { id: "llm", label: "Языковые модели", short: "LLM" },
  { id: "vision", label: "Зрение", short: "Зрение" },
  { id: "speech", label: "Речь", short: "Речь" },
  { id: "video", label: "Видео", short: "Видео" },
  { id: "robotics", label: "Робототехника", short: "Роботы" },
  { id: "chips", label: "Чипы", short: "Чипы" },
  { id: "cloud", label: "Облако", short: "Облако" },
  { id: "other", label: "Другое", short: "Другое" },
];

export function categoryLabel(id: CategoryId): string {
  return CATEGORIES.find((item) => item.id === id)?.label ?? id;
}

export function categoryShort(id: CategoryId): string {
  return CATEGORIES.find((item) => item.id === id)?.short ?? id;
}
