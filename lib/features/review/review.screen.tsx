import { useLocalSearchParams } from 'expo-router';

import { ReviewContainer } from './review.container';
import { DeckScreenParams } from '../../types';

export function ReviewScreen() {
  const params = useLocalSearchParams<DeckScreenParams>();

  return <ReviewContainer deckId={params.id} />;
}
