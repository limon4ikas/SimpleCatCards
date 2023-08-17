import { Stack } from 'expo-router';

import { MyStack } from '../../../lib/components';

export const unstable_settings = {
  initialRouteName: 'overview',
};

export default function DecksLayout() {
  return (
    <MyStack>
      <Stack.Screen name="overview" options={{ title: 'Overview' }} />
      <Stack.Screen name="index" options={{ title: 'Decks' }} />
      <Stack.Screen name="[id]/index" options={{ title: 'Decks' }} />
      <Stack.Screen
        name="[id]/create"
        options={{ presentation: 'modal', headerShown: false }}
      />
      <Stack.Screen name="create" options={{ presentation: 'modal' }} />
    </MyStack>
  );
}
