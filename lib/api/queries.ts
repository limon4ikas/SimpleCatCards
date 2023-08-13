import {
  createQueryKeyStore,
  inferQueryKeyStore,
} from '@lukemorales/query-key-factory';

export const queries = createQueryKeyStore({
  decks: {
    all: { queryKey: ['decks'], queryFn: () => {} },
  },
});

export type QueryKeys = inferQueryKeyStore<typeof queries>;
