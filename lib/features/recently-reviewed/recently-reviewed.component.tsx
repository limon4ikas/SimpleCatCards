import { YStack } from 'tamagui';

import { Text } from '../../components';
import { DecksResponse } from '../../types';

type RecentlyReviewedProps = { decks: DecksResponse[] };

export function RecentlyReviewed({ decks }: RecentlyReviewedProps) {
  return (
    <YStack>
      <Text>Recently Reviewed</Text>
      <YStack>
        {decks.map((deck) => (
          <Text key={deck.id}>{deck.name}</Text>
        ))}
      </YStack>
    </YStack>
  );
}
