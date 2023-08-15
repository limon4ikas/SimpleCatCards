import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useURL } from 'expo-linking';
import { useRouter } from 'expo-router';
import {
  AuthMethodsList,
  AuthProviderInfo,
  ClientResponseError,
  RecordAuthResponse,
} from 'pocketbase';
import { useEffect } from 'react';

import {
  getAuthProviders,
  loginWithEmailPassword,
  pb,
  queries,
  registerWithEmailPassword,
} from '../../../api';
import { config } from '../../../config';
import { Collections, UsersResponse } from '../../../types';
import {
  LoginWithEmailPassword,
  RegisterWithEmailPassword,
} from '../../../types/api';

export function useLoginWithEmailPasswordMutation() {
  const router = useRouter();

  return useMutation<
    RecordAuthResponse<UsersResponse>,
    ClientResponseError,
    LoginWithEmailPassword
  >({
    mutationFn: ({ email, password }) =>
      loginWithEmailPassword(email, password),
    onSuccess: () => router.push('/(home)/decks/overview'),
  });
}

export function useQueryAuthMethods() {
  return useQuery<AuthMethodsList, ClientResponseError>({
    queryKey: queries.authMethods._def,
    queryFn: () => getAuthProviders(),
  });
}

export function useRegisterWithEmailPasswordMutation() {
  return useMutation<
    UsersResponse,
    ClientResponseError,
    RegisterWithEmailPassword
  >({
    mutationFn: ({ email, password, passwordConfirm }) =>
      registerWithEmailPassword(email, password, passwordConfirm),
  });
}

export function useOauthRedirect() {
  const strUrl = useURL();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!strUrl) return;

      const url = new URL(strUrl);

      if (!url.searchParams.has('code')) return;

      const providerStr = await AsyncStorage.getItem('provider');

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
        );

      router.push('/(home)/decks/');
    })();
  }, [router, strUrl]);
}
