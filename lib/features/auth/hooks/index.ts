import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import { useURL } from 'expo-linking';
import { useRouter } from 'expo-router';
import {
  AuthMethodsList,
  AuthProviderInfo,
  ClientResponseError,
} from 'pocketbase';
import { useEffect } from 'react';

import { api, pb, queries } from '../../../api';
import { config } from '../../../config';
import { Collections } from '../../../types';

export function useQueryAuthMethods() {
  return useQuery<AuthMethodsList, ClientResponseError>({
    queryKey: queries.authMethods._def,
    queryFn: api.getAuthProviders,
  });
}

export function useOAuth() {
  const strUrl = useURL();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!strUrl) return;

      const url = new URL(strUrl);

      if (!url.searchParams.has('code')) return;

      const providerStr = await AsyncStorage.getItem('provider').catch(
        console.log,
      );

      if (!providerStr) return;

      const provider = JSON.parse(providerStr) as AuthProviderInfo;

      if (provider.state !== url.searchParams.get('state')) {
        throw new Error("State parameters don't match.");
      }

      await pb
        .collection(Collections.Users)
        .authWithOAuth2Code(
          provider.name,
          url.searchParams.get('code')!,
          provider.codeVerifier,
          config.EXPO_PUBLIC_REDIRECT_URL,
        )
        .catch(console.log);

      router.push('/(home)/decks/');
    })();
  }, [router, strUrl]);
}
