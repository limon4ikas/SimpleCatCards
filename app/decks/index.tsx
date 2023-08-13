import { ScrollView, YStack } from 'tamagui';

import { DeckListContainer } from '../../lib/features';
import { CreateDeckButtonContainer } from '../../lib/features/create-deck';

export default function DeckListScreen() {
  return (
    <ScrollView contentContainerStyle={{ paddingTop: 18 }}>
      <YStack px="$4" gap="$4">
        <DeckListContainer />
        <CreateDeckButtonContainer />
      </YStack>
    </ScrollView>
  );
}
