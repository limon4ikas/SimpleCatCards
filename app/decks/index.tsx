import Animated, { Layout } from 'react-native-reanimated';
import { ScrollView, YStack } from 'tamagui';

import { DeckListContainer } from '../../lib/features';
import { CreateDeckButtonContainer } from '../../lib/features/create-deck';

export default function DeckListScreen() {
  return (
    <ScrollView contentContainerStyle={{ paddingTop: 18 }}>
      <YStack px="$4" gap="$4">
        <Animated.View layout={Layout} style={{ gap: 16 }}>
          <DeckListContainer />
        </Animated.View>
        <Animated.View layout={Layout}>
          <CreateDeckButtonContainer />
        </Animated.View>
      </YStack>
    </ScrollView>
  );
}
