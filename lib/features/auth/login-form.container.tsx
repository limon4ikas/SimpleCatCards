import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProviderInfo } from 'pocketbase';
import { ActivityIndicator, Linking } from 'react-native';
import { Button, YStack, Text } from 'tamagui';

import {
  useLoginWithEmailPasswordMutation,
  useOauthRedirect,
  useQueryAuthMethods,
} from './hooks';
import { LoginForm } from './login-form.component';
import { config } from '../../config';
import { LoginWithEmailPassword } from '../../types/api';

export function LoginFormContainer() {
  const loginWithPassword = useLoginWithEmailPasswordMutation();
  const { data, status, error } = useQueryAuthMethods();
  useOauthRedirect();

  async function handleProviderAuthClick(provider: AuthProviderInfo) {
    await AsyncStorage.setItem('provider', JSON.stringify(provider));

    Linking.openURL(`${provider.authUrl}${config.EXPO_PUBLIC_REDIRECT_URL}`);
  }

  function handleLoginFormSubmit(credentials: LoginWithEmailPassword) {
    loginWithPassword.mutate(credentials);
  }

  if (status === 'loading') return <ActivityIndicator />;

  if (status === 'error') return <Text>{error.message}</Text>;

  return (
    <YStack flex={1} justifyContent="center" p="$4" gap="$4">
      <LoginForm
        onSubmit={handleLoginFormSubmit}
        fetchError={loginWithPassword.error?.message}
      />
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
