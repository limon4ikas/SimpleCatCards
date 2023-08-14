/**
 * This file was @generated using pocketbase-typegen
 */

export enum Collections {
  Cards = 'cards',
  Decks = 'decks',
  Users = 'users',
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString;
  created: IsoDateString;
  updated: IsoDateString;
  collectionId: string;
  collectionName: Collections;
  expand?: T;
};

export type AuthSystemFields<T = never> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type CardsRecord = {
  question: string;
  answer: string;
  deck?: RecordIdString;
};

export type DecksRecord = {
  name: string;
  description?: string;
  lastEdited: IsoDateString;
  lastAttempted?: IsoDateString;
  color: string;
  cards?: RecordIdString[];
  user?: RecordIdString;
};

export type UsersRecord = {
  name?: string;
  avatar?: string;
  decks?: RecordIdString[];
};

// Response types include system fields and match responses from the PocketBase API
export type CardsResponse<Texpand = unknown> = Required<CardsRecord> &
  BaseSystemFields<Texpand>;
export type DecksResponse<Texpand = unknown> = Required<DecksRecord> &
  BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> &
  AuthSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  cards: CardsRecord;
  decks: DecksRecord;
  users: UsersRecord;
};

export type CollectionResponses = {
  cards: CardsResponse;
  decks: DecksResponse;
  users: UsersResponse;
};
