import { Stack } from 'expo-router';

import { MyStack } from '../../../lib/components';

export const unstable_settings = {
  initialRouteName: 'overview',
};

export default function DecksLayout() {
  return (
    <MyStack>
      <Stack.Screen name="overview" options={{ title: '' }} />
      <Stack.Screen name="index" options={{ title: 'Decks' }} />
      <Stack.Screen name="[id]/index" options={{ title: 'Deck' }} />
      <Stack.Screen name="[id]/review" options={{ title: 'Review' }} />
      <Stack.Screen
        name="[id]/create"
        options={{ presentation: 'modal', title: 'Add Cards' }}
      />
      <Stack.Screen name="create" options={{ presentation: 'modal' }} />
    </MyStack>
  );
}
