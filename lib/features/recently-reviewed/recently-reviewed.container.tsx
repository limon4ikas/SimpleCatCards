import { Text } from 'tamagui';

import { RecentlyReviewed } from './recently-reviewed.component';
import { useQueryRecentlyReviewed } from './recently-reviewed.hooks';

export function RecentlyReviewedContainer() {
  const { data, status, error } = useQueryRecentlyReviewed();

  if (status === 'loading') return <Text>Loading...</Text>;

  if (status === 'error') return <Text>{error.message}</Text>;

  return <RecentlyReviewed decks={data} />;
}
