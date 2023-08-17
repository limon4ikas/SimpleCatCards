import { useQuery } from '@tanstack/react-query';
import { ClientResponseError } from 'pocketbase';

import { getDeckWithCards, queries } from '../../../api';
import { DeckWithCards } from '../../../types';

export function useCardListQuery(deckId: string) {
  return useQuery<DeckWithCards, ClientResponseError>({
    queryKey: queries.decks.single(deckId).queryKey,
    queryFn: () => getDeckWithCards(deckId),
  });
}
