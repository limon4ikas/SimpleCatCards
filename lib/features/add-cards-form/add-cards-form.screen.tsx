import { useLocalSearchParams } from 'expo-router';

import { AddCardsFormContainer } from './add-cards-form.container';
import { DeckScreenParams } from '../../types';

export function AddCardsFormScreen() {
  const { id } = useLocalSearchParams<DeckScreenParams>();

  return <AddCardsFormContainer deckId={id} />;
}
