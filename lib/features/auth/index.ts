import { useMutation, useQuery } from '@tanstack/react-query';
import { ClientResponseError, RecordAuthResponse } from 'pocketbase';
import { useEffect, useState } from 'react';

import {
  loginWithEmailPassword,
  pb,
  queries,
  registerWithEmailPassword,
} from '../../api';
import { UsersResponse } from '../../types';
import {
  LoginWithEmailPassword,
  RegisterWithEmailPassword,
} from '../../types/api';

export function useLoginWithEmailPasswordMutation() {
  return useMutation<
    RecordAuthResponse<UsersResponse>,
    ClientResponseError,
    LoginWithEmailPassword
  >({
    mutationFn: ({ email, password }) =>
      loginWithEmailPassword(email, password),
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

export function useUserAuth() {
  const [user, setUser] = useState<UsersResponse | null>(null);

  useEffect(() => {
    const cleanup = pb.authStore.onChange((token, model) => {
      console.log(model);
      setUser(model as unknown as UsersResponse);
    });

    return () => cleanup();
  }, []);

  return user;
}

export function useUserQuery() {
  return useQuery<UsersResponse, ClientResponseError>(queries.user._def);
}
