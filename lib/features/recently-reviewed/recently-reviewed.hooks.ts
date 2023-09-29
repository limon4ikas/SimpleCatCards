import { useQuery } from '@tanstack/react-query';
import { ClientResponseError } from 'pocketbase';

import { api, queries } from '../../api';
import { DecksResponse } from '../../types';

export function useQueryRecentlyReviewed() {
  return useQuery<DecksResponse[], ClientResponseError>({
    queryKey: queries.decks.recentlyReviewed.queryKey,
    queryFn: api.getRecentlyReviewed,
  });
}
