import { useLocalSearchParams } from 'expo-router';
import { YStack } from 'tamagui';

import { ReviewContainer } from './review.container';
import { DeckScreenParams } from '../../types';

export function ReviewScreen() {
  const params = useLocalSearchParams<DeckScreenParams>();

  return (
    <YStack flex={1}>
      <ReviewContainer deckId={params.id} />
    </YStack>
  );
}
