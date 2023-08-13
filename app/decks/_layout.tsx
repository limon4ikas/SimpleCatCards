import { Stack } from 'expo-router';

import { MyStack } from '../../lib/components';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function DecksLayout() {
  return (
    <MyStack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="create" options={{ presentation: 'modal' }} />
    </MyStack>
  );
}
