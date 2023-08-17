import { DecksResponse, FlashcardsResponse } from './pocketbase-types';

export type DeckWithCards = DecksResponse<{ cards: FlashcardsResponse[] }>;
