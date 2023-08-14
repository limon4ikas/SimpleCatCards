import { useQuery } from '@tanstack/react-query';
import { ClientResponseError } from 'pocketbase';
import { useMemo, useState } from 'react';

import { getDecks } from '../../api/pb';
import { queries } from '../../api/queries';
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

export function useQueryDecks(userId: string) {
  return useQuery<DecksResponse[], ClientResponseError>({
    ...queries.decks.all,
    queryFn: () => getDecks(userId),
  });
}
