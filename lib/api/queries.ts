import {
  createQueryKeyStore,
  inferQueryKeyStore,
} from '@lukemorales/query-key-factory';

import { loginWithEmailPassword } from './pb';

export const queries = createQueryKeyStore({
  decks: { all: null },
  user: {
    loginWithEmailPassword: (email: string, password: string) => ({
      queryKey: [email, password],
      queryFn: () => loginWithEmailPassword(email, password),
    }),
  },
});

export type QueryKeys = inferQueryKeyStore<typeof queries>;
