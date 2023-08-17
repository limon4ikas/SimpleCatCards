import { Link } from 'expo-router';
import { YStack } from 'tamagui';

import { useQueryRecentlyReviewed } from './recently-reviewed.hooks';
import { Button, Text } from '../../components';
import { DeckList } from '../deck-list/deck-list.component';

export function RecentlyReviewedContainer() {
  const { data, status, error } = useQueryRecentlyReviewed();

  if (status === 'loading') return <Text>Loading...</Text>;

  if (status === 'error') return <Text>{error.message}</Text>;

  return (
    <YStack gap="$4">
      <DeckList label={<Text type="title-1">Recent decks</Text>} decks={data} />
      <Link href="/(home)/decks/" asChild>
        <Button size="$4" withElevationShadow>
          All decks
        </Button>
      </Link>
    </YStack>
  );
}
