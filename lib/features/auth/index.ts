import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { ClientResponseError, RecordAuthResponse } from 'pocketbase';

import { loginWithEmailPassword, registerWithEmailPassword } from '../../api';
import { UsersResponse } from '../../types';
import {
  LoginWithEmailPassword,
  RegisterWithEmailPassword,
} from '../../types/api';

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

export * from './user.context';
