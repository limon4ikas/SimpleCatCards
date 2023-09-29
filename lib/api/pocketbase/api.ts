import { addDays } from "date-fns";
import { SuperMemoItem } from "supermemo";

import { pb } from "./pb";
import {
  Collections,
  DecksRecord,
  DecksResponse,
  DeckWithCards,
  FlashcardsRecord,
  FlashcardsResponse
} from "../../types";

export const api = {
  getDecks() {
    return pb.collection(Collections.Decks).getFullList<DecksResponse>();
  },
  deleteDeck(deckId: string) {
    return pb.collection(Collections.Decks).delete(deckId);
  },
  createDeck(
    deck: Pick<
      DecksRecord,
      "color" | "name" | "description" | "user" | "lastEdited"
    >
  ) {
    return pb.collection(Collections.Decks).create<DecksResponse>(deck);
  },
  getAuthProviders() {
    return pb.collection(Collections.Users).listAuthMethods();
  },
  async getRecentlyReviewed() {
    const data = await pb
      .collection(Collections.Decks)
      .getList<DecksResponse>(1, 4, { sort: "-lastAttempted" });

    return data.items;
  },
  getDeckWithCards(deckId: string) {
    return pb.collection(Collections.Decks).getOne<DeckWithCards>(deckId, {
      expand: "cards"
    });
  },
  async createCards(deckId: string, cards: { front: string; back: string }[]) {
    const flashcards: FlashcardsRecord[] = cards.map(({ back, front }) => ({
      back,
      front,
      dueDate: new Date().toISOString(),
      deck: deckId,
      interval: 0,
      repetition: 0,
      efactor: 2.5
    }));

    const currentDeck = await pb
      .collection(Collections.Decks)
      .getOne<DecksResponse>(deckId);

    // 1. Create cards
    const createdCardsPromises = flashcards.map(async (record) => {
      return pb
        .collection(Collections.Flashcards)
        .create<FlashcardsResponse>(record, {
          requestKey: null
        });
    });

    const createdCardIds = (await Promise.all(createdCardsPromises)).map(
      (card) => card.id
    );

    return pb.collection(Collections.Decks).update<DecksResponse>(
      currentDeck.id,
      {
        cards: [...currentDeck.cards, ...createdCardIds]
      },
      { requestKey: null }
    );
  },
  async practiceCard(item: { cardId: string; deckId: string; update: SuperMemoItem }) {

    const updatedCard = await pb.collection(Collections.Flashcards).update<FlashcardsResponse>(item.cardId, {
      ...item.update,
      dueDate: addDays(new Date(), item.update.interval).toISOString()
    });

    await pb.collection(Collections.Decks).update<DecksResponse>(item.deckId, {
      lastAttempted: new Date().toISOString()
    });

    return updatedCard;
  }
} as const;
