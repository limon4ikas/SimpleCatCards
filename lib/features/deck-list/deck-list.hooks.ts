import { useMutation, useQuery } from '@tanstack/react-query';
import { ClientResponseError } from 'pocketbase';
import { useMemo, useState } from 'react';

import { api } from '../../api';
import { queries, queryClient } from '../../api/queries';
import { DecksResponse } from '../../types';

type UseDeckListConfig = {
  decks: DecksResponse[];
};

export const useDeckList = (config: UseDeckListConfig) => {
  const [filterName, setFilterName] = useState('');

  const filteredDecks = useMemo(
    () =>
      filterName.length
        ? config.decks.filter((deck) => deck.name.includes(filterName))
        : config.decks,
    [config.decks, filterName],
  );

  return { filterName, setFilterName, filteredDecks };
};

export function useUserDecks() {
  return useQuery<DecksResponse[], ClientResponseError>({
    queryKey: queries.decks.all.queryKey,
    queryFn: () => api.getDecks(),
  });
}

export function useUserDeckDelete() {
  return useMutation<boolean, ClientResponseError, string>({
    mutationFn: (deckId) => api.deleteDeck(deckId),
    mutationKey: ['deleteDeck'],
    onSuccess: (isSuccessDelete) => {
      queryClient.invalidateQueries({
        queryKey: queries.decks.all.queryKey,
      });
    },
  });
}
