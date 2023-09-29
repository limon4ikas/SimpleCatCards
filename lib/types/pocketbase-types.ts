/**
 * This file was @generated using pocketbase-typegen
 */

export enum Collections {
  Decks = 'decks',
  Flashcards = 'flashcards',
  Sessions = 'sessions',
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

export type DecksRecord = {
  cards?: RecordIdString[];
  color: string;
  description?: string;
  lastAttempted?: IsoDateString;
  lastEdited?: IsoDateString;
  name: string;
  sessions?: RecordIdString[];
  user?: RecordIdString;
};

export type FlashcardsRecord = {
  back: string;
  deck?: RecordIdString;
  dueDate: IsoDateString;
  efactor?: number;
  front: string;
  interval?: number;
  repetition?: number;
};

export type SessionsRecord = {
  cardsTrained?: RecordIdString[];
  deck?: RecordIdString;
  sessionDate?: IsoDateString;
};

export type UsersRecord = {
  avatar?: string;
  decks?: RecordIdString[];
  name?: string;
};

// Response types include system fields and match responses from the PocketBase API
export type DecksResponse<Texpand = unknown> = Required<DecksRecord> &
  BaseSystemFields<Texpand>;
export type FlashcardsResponse<Texpand = unknown> = Required<FlashcardsRecord> &
  BaseSystemFields<Texpand>;
export type SessionsResponse<Texpand = unknown> = Required<SessionsRecord> &
  BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> &
  AuthSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  decks: DecksRecord;
  flashcards: FlashcardsRecord;
  sessions: SessionsRecord;
  users: UsersRecord;
};

export type CollectionResponses = {
  decks: DecksResponse;
  flashcards: FlashcardsResponse;
  sessions: SessionsResponse;
  users: UsersResponse;
};
