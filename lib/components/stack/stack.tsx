import { Stack } from 'expo-router';
import { ComponentProps } from 'react';

export function MyStack(props: ComponentProps<typeof Stack>) {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: 'white' },
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: 'SFProRoundedSemibold',
          fontSize: 18,
        },
        headerBackTitleStyle: {
          fontFamily: 'SFProRoundedSemibold',
          fontSize: 18,
        },
      }}
      {...props}
    />
  );
}
