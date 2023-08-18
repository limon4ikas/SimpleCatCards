import {
  createQueryKeyStore,
  inferQueryKeyStore,
} from '@lukemorales/query-key-factory';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const queries = createQueryKeyStore({
  authMethods: null,
  decks: {
    all: null,
    recentlyReviewed: null,
    single: (deckId: string) => ({
      queryKey: [deckId],
    }),
  },
});

export type QueryKeys = inferQueryKeyStore<typeof queries>;
