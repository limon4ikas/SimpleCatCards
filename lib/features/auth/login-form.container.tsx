import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProviderInfo } from 'pocketbase';
import { ActivityIndicator, Linking } from 'react-native';
import { Button, Text, YStack } from 'tamagui';

import { useOAuth, useQueryAuthMethods } from './hooks';
import { config } from '../../config';

export function LoginFormContainer() {
  const { data, status, error } = useQueryAuthMethods();

  useOAuth();

  async function handleProviderAuthClick(provider: AuthProviderInfo) {
    await AsyncStorage.setItem('provider', JSON.stringify(provider));

    await Linking.openURL(
      `${provider.authUrl}${config.EXPO_PUBLIC_REDIRECT_URL}`,
    );
  }

  if (status === 'loading') {
    return (
      <YStack flex={1} justifyContent="center">
        <ActivityIndicator />
      </YStack>
    );
  }

  if (status === 'error') return <Text>{error.message}</Text>;

  return (
    <YStack flex={1} justifyContent="center" p="$4" gap="$4">
      <ProviderList
        providers={data.authProviders}
        onProviderAuth={handleProviderAuthClick}
      />
    </YStack>
  );
}

export type ProviderListProps = {
  providers: AuthProviderInfo[];
  onProviderAuth: (provider: AuthProviderInfo) => void;
};

function ProviderList({ providers, onProviderAuth }: ProviderListProps) {
  return (
    <YStack>
      {providers.map((provider) => (
        <Button key={provider.name} onPress={() => onProviderAuth(provider)}>
          {provider.name}
        </Button>
      ))}
    </YStack>
  );
}
