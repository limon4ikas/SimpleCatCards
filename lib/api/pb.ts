import PocketBase from 'pocketbase';

import { AsyncAuthStore } from './auth-store';
import { config } from '../config';
import {
  Collections,
  DecksRecord,
  DecksResponse,
  UsersResponse,
} from '../types';

export const pb = new PocketBase(
  config.EXPO_PUBLIC_API_URL,
  new AsyncAuthStore(),
);

export function getDecks() {
  return pb.collection(Collections.Decks).getFullList<DecksResponse>();
}

export function deleteDeck(deckId: string) {
  return pb.collection(Collections.Decks).delete(deckId);
}

export function loginWithEmailPassword(email: string, password: string) {
  return pb
    .collection(Collections.Users)
    .authWithPassword<UsersResponse>(email, password);
}

export function createDeck(
  deck: Pick<
    DecksRecord,
    'color' | 'name' | 'description' | 'user' | 'lastEdited'
  >,
) {
  return pb.collection(Collections.Decks).create<DecksResponse>(deck);
}

export function getAuthProviders() {
  return pb.collection(Collections.Users).listAuthMethods();
}

export async function registerWithEmailPassword(
  email: string,
  password: string,
  passwordConfirm: string,
) {
  return pb.collection(Collections.Users).create<UsersResponse>({
    email,
    password,
    passwordConfirm,
  });
}

export function getRecentlyReviewed() {
  return pb
    .collection(Collections.Decks)
    .getList<DecksResponse>(1, 4, { sort: '-lastAttempted' })
    .then((d) => d.items);
}
