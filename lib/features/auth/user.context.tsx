import {
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
  useContext,
} from 'react';

import { pb } from '../../api';
import { UsersResponse } from '../../types';
import { Redirect } from 'expo-router';

export interface AuthContextType {
  user: UsersResponse | null;
}

export function useAuth() {
  const [user, setUser] = useState<UsersResponse | null>(null);

  useEffect(() => {
    const cleanup = pb.authStore.onChange((token, model) => {
      setUser(model as unknown as UsersResponse);
    });

    return () => cleanup();
  }, []);

  return { user };
}

const AuthContext = createContext<null | AuthContextType>(null);

export function AuthContextProvider(props: PropsWithChildren) {
  const { user } = useAuth();

  if (!user) return <Redirect href="/auth/login" />;

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
