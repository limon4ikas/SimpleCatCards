import { useMutation } from '@tanstack/react-query';
import { ClientResponseError } from 'pocketbase';

import { api, queries, queryClient } from '../../api';
import { DecksResponse } from '../../types';

export function useAddCardsMutation() {
  return useMutation<
    DecksResponse,
    ClientResponseError,
    { deckId: string; cards: { front: string; back: string }[] }
  >({
    mutationFn: ({ deckId, cards }) => api.createCards(deckId, cards),
    onSuccess: async () => {
      await queryClient.invalidateQueries(queries.decks._def);
    },
  });
}
