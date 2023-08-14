import { Redirect, useRootNavigationState } from 'expo-router';

export default function IndexScreen() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  return <Redirect href="/decks/" />;
}
