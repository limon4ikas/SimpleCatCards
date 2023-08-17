import { useMutation } from '@tanstack/react-query';
import { ClientResponseError } from 'pocketbase';

import { CreateDeckFormT } from './create-deck.component';
import { api, queries, queryClient } from '../../api';
import { DecksResponse } from '../../types';
import { useUser } from '../auth';

export function useCreateDeckMutation() {
  const user = useUser();

  return useMutation<DecksResponse, ClientResponseError, CreateDeckFormT>({
    mutationFn: (variables) =>
      api.createDeck({
        ...variables,
        user: user.id,
        lastEdited: new Date().toISOString(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.decks.all.queryKey);
    },
  });
}
