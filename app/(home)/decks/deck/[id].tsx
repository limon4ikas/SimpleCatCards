import { Stack, useGlobalSearchParams } from 'expo-router';

import { DeckContainer } from '../../../../lib/features/deck';
import { DeckScreenParams } from '../../../../lib/types';

export default function DeckScreen() {
  const params = useGlobalSearchParams<DeckScreenParams>();

  return (
    <>
      <Stack.Screen options={{ title: params.name }} />
      <DeckContainer id={params.id} name={params.name} />
    </>
  );
}
