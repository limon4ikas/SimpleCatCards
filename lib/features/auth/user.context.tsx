import { Href, Redirect } from 'expo-router';
import {
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
  useContext,
} from 'react';

import { pb } from '../../api';
import { UsersResponse } from '../../types';

export interface AuthContextType {
  user: UsersResponse | null;
}

export function useAuth() {
  const [user, setUser] = useState<UsersResponse | null>(
    () => pb.authStore.model as unknown as UsersResponse,
  );

  useEffect(() => {
    if (pb.authStore.isValid) return;

    pb.authStore.clear();
  }, []);

  useEffect(() => {
    const cleanup = pb.authStore.onChange((_token, model) => {
      setUser(model as unknown as UsersResponse);
    }, true);

    return () => cleanup();
  }, []);

  return { user };
}

const AuthContext = createContext<null | AuthContextType>(null);

export function AuthContextProvider<T>(
  props: PropsWithChildren<{ redirectHref: Href<T> }>,
) {
  const { user } = useAuth();

  if (!user) return <Redirect href={props.redirectHref} />;

  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuthContext must be used within <AuthContextProvider />',
    );
  }

  return context;
}

export function useUser() {
  const { user } = useAuthContext();

  if (!user) {
    throw new Error('Access user without auth!');
  }

  return user;
}
