import { useRootNavigationState, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function IndexScreen() {
  const rootNavigationState = useRootNavigationState();
  const router = useRouter();

  useEffect(() => {
    if (!rootNavigationState?.key) return;

    router.replace('/(home)/decks/overview');
  }, [rootNavigationState?.key, router]);

  if (!rootNavigationState?.key) return null;

  return null;
}
