import { Link } from 'expo-router';
import { Text, YStack } from 'tamagui';

export default function OverviewScreen() {
  return (
    <YStack flex={1} alignItems="center" justifyContent="center">
      <Text>Overview Screen</Text>
      <Link href="/(home)/decks/">Decks</Link>
    </YStack>
  );
}
