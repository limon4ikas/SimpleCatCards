import { Stack, useGlobalSearchParams } from 'expo-router';
import { ScrollView } from 'tamagui';

import { AddCardsFormContainer } from './add-cards-form';
import { CardListContainer } from './card-list';
import { DeckScreenParams } from '../../types';

export function DeckScreen() {
  const params = useGlobalSearchParams<DeckScreenParams>();

  return (
    <ScrollView p="$4">
      <Stack.Screen options={{ title: params.name }} />
      <AddCardsFormContainer />
      <CardListContainer deckId={params.id} />
    </ScrollView>
  );
}
