import { Stack } from 'expo-router';

import { MyStack } from '../../lib/components';

export default function AuthLayout() {
  return (
    <MyStack>
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="register" options={{ title: 'Register' }} />
    </MyStack>
  );
}
