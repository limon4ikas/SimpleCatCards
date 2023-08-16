import { useMutation } from '@tanstack/react-query';
import { ClientResponseError } from 'pocketbase';

import { CreateDeckFormT } from './create-deck.component';
import { createDeck, queries, queryClient } from '../../api';
import { DecksResponse } from '../../types';
import { useUser } from '../auth';

export function useCreateDeckMutation() {
  const user = useUser();

  return useMutation<DecksResponse, ClientResponseError, CreateDeckFormT>({
    mutationFn: (variables) => createDeck(variables),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.decks.all(user.id));
    },
  });
}
