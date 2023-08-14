import { Link } from 'expo-router';
import { useEffect } from 'react';
import { YStack } from 'tamagui';

import { pb } from '../lib/api';
import { config } from '../lib/config';

export default function OverviewScreen() {
  useEffect(() => {
    (async () => {
      const result = await pb.collection('decks').getFullList();

      console.log(result);
      console.log(config.EXPO_PUBLIC_API_URL);
    })();
  }, []);

  return (
    <YStack flex={1} alignItems="center" justifyContent="center">
      <Link href="/decks">Go to decks</Link>
    </YStack>
  );
}
