import { Link } from 'expo-router';
import { YStack } from 'tamagui';

export default function OverviewScreen() {
  return (
    <YStack flex={1} alignItems="center" justifyContent="center">
      <Link href="/decks">Go to decks</Link>
    </YStack>
  );
}
