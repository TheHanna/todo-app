export const Priority = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const;

export const PriorityOrder: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
} as const;

export type Priority = (typeof Priority)[keyof typeof Priority];
