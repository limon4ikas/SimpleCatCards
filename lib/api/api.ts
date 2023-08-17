import { pb } from './pb';
import {
  Collections,
  DeckWithCards,
  DecksRecord,
  DecksResponse,
} from '../types';

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
} as const;
