import {
  createQueryKeyStore,
  inferQueryKeyStore,
} from '@lukemorales/query-key-factory';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const queries = createQueryKeyStore({
  decks: { all: (userId: string) => [userId] },
});

export type QueryKeys = inferQueryKeyStore<typeof queries>;
