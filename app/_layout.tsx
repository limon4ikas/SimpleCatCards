import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider, Theme } from 'tamagui';

import { MyStack } from '../lib/components';
import config from '../tamagui.config';

const queryClient = new QueryClient();

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    SFProRounded: require('../assets/fonts/SF-Pro-Rounded-Medium.ttf'),
    SFProRoundedMedium: require('../assets/fonts/SF-Pro-Rounded-Medium.ttf'),
    SFProRoundedBlack: require('../assets/fonts/SF-Pro-Rounded-Black.ttf'),
    SFProRoundedBold: require('../assets/fonts/SF-Pro-Rounded-Bold.ttf'),
    SFProRoundedHeavy: require('../assets/fonts/SF-Pro-Rounded-Heavy.ttf'),
    SFProRoundedLight: require('../assets/fonts/SF-Pro-Rounded-Light.ttf'),
    SFProRoundedRegular: require('../assets/fonts/SF-Pro-Rounded-Regular.ttf'),
    SFProRoundedSemibold: require('../assets/fonts/SF-Pro-Rounded-Semibold.ttf'),
    SFProRoundedThin: require('../assets/fonts/SF-Pro-Rounded-Thin.ttf'),
    SFProRoundedUltralight: require('../assets/fonts/SF-Pro-Rounded-Ultralight.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={config}>
          <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
            <MyStack>
              <Stack.Screen name="index" options={{ title: 'Overview' }} />
              <Stack.Screen name="decks" options={{ title: 'Decks' }} />
              <Stack.Screen name="deck/[id]" options={{ title: 'Decks' }} />
              <Stack.Screen name="auth/login" options={{ title: 'Login' }} />
              <Stack.Screen
                name="auth/register"
                options={{ title: 'Register' }}
              />
            </MyStack>
          </Theme>
        </TamaguiProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
