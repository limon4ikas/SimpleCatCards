import PocketBase from 'pocketbase';

import { config } from '../config';
import { Collections, DecksResponse, UsersResponse } from '../types';

export const pb = new PocketBase(config.EXPO_PUBLIC_API_URL);

export function getDecks(userId: string) {
  return pb.collection(Collections.Decks).getFullList<DecksResponse>({
    filter: `user = "${userId}"`,
  });
}

export function deleteDeck(deckId: string) {
  return pb.collection(Collections.Decks).delete(deckId);
}

export function loginWithEmailPassword(email: string, password: string) {
  return pb
    .collection(Collections.Users)
    .authWithPassword<UsersResponse>(email, password);
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
