import { Text, YStack } from 'tamagui';

import { DecksResponse } from '../../types';

type RecentlyReviewedProps = { decks: DecksResponse[] };

export function RecentlyReviewed({ decks }: RecentlyReviewedProps) {
  return (
    <YStack>
      <Text>Recently Reviewed</Text>
      <YStack>
        {decks.map((deck) => (
          <Text>{deck.name}</Text>
        ))}
      </YStack>
    </YStack>
  );
}
