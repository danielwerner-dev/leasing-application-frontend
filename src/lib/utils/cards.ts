import { v4 as uuid } from "uuid";

export function addCard<T>(cards: T[], emptyCard: T): T[] {
  return [
    ...cards,
    {
      ...emptyCard,
      id: uuid(),
    },
  ];
}

export function removeCard<T = unknown>(
  cards: T[],
  indexToRemove: number
): T[] {
  cards.splice(indexToRemove, 1);
  return [...cards];
}
