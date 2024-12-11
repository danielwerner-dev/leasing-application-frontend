import { addCard, removeCard } from "$lib/utils/cards";

describe("Cards", () => {
  let cards: any[] = [];
  describe("addCard", () => {
    it("adds cards", () => {
      cards = addCard<any>(cards, {});
      cards = addCard<any>(cards, {});
      cards = addCard<any>(cards, {});

      expect(cards).toHaveLength(3);
    });
  });

  describe("removeCard", () => {
    it("removes cards", () => {
      const idCardTwo = cards[2].id;
      cards = removeCard(cards, 2);

      expect(cards).toHaveLength(2);
      expect(cards.findIndex((card) => card.id === idCardTwo)).toEqual(-1);
    });
  });
});
