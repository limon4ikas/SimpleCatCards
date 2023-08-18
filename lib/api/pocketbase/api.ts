import { pb } from './pb';
import {
  Collections,
  DeckWithCards,
  DecksRecord,
  DecksResponse,
  FlashcardsRecord,
  FlashcardsResponse,
} from '../../types';

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
      'color' | 'name' | 'description' | 'user' | 'lastEdited'
    >,
  ) {
    return pb.collection(Collections.Decks).create<DecksResponse>(deck);
  },
  getAuthProviders() {
    return pb.collection(Collections.Users).listAuthMethods();
  },
  getRecentlyReviewed() {
    return pb
      .collection(Collections.Decks)
      .getList<DecksResponse>(1, 4, { sort: '-lastAttempted' })
      .then((d) => d.items);
  },
  getDeckWithCards(deckId: string) {
    return pb.collection(Collections.Decks).getOne<DeckWithCards>(deckId, {
      expand: 'cards',
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
      efactor: 2.5,
    }));

    const currentDeck = await pb
      .collection(Collections.Decks)
      .getOne<DecksResponse>(deckId);

    // 1. Create cards
    const createdCardsPromises = flashcards.map(async (record) => {
      return pb
        .collection(Collections.Flashcards)
        .create<FlashcardsResponse>(record, {
          $autoCancel: false,
        });
    });

    const createdCardIds = (await Promise.all(createdCardsPromises)).map(
      (card) => card.id,
    );

    return pb.collection(Collections.Decks).update<DecksResponse>(
      currentDeck.id,
      {
        cards: [...currentDeck.cards, ...createdCardIds],
      },
      { $autoCancel: false },
    );
  },
} as const;
