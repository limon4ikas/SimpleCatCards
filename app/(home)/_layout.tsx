import { Slot } from 'expo-router';

import { AuthContextProvider } from '../../lib/features/auth';

export default function HomeLayout() {
  return (
    <AuthContextProvider>
      <Slot />
    </AuthContextProvider>
  );
}
