/** Represent deck of cards with question and answer on them */
export type DeckModel = {
  /** Internal ident */
  id: string;
  /** Cards folder name */
  name: string;
  /** Description of deck */
  description?: string;
  /** Cards */
  cards: CardModel[];
  /** When added/removed cards from deck */
  lastEdited: Date;
  /** When last attempted this deck */
  lastAttempted?: Date;
  /** Primary color of the deck */
  color?: string;
};

/** Single card from deck with question and answer on it */
export type CardModel = {
  /** Internal ident */
  id: string;
  /** Optional type */
  type?: string;
  /** Card question on front */
  question: string;
  /** Card answer on back */
  answer: string;
};

export type DeckTypes = 'simple';
