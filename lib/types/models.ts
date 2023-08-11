/** Represent deck of cards with question and answer on them */
export type Deck = {
  /** Internal ident */
  id: string;
  /** Cards folder name */
  name: string;
  /** Cards */
  cards: Card[];
  /** Total number of cards in deck */
  cardsCount: number;
  /** When added/removed cards from deck */
  lastEdited: Date;
  /** When last attempted this deck */
  lastAttempted: Date;
};

/** Single card from deck with question and answer on it */
export type Card = {
  /** Internal ident */
  id: string;
  /** Optional type */
  type?: string;
  /** Card question on front */
  question: string;
  /** Card answer on back */
  answer: string;
};
