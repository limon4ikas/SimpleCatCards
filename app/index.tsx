import { YStack } from "tamagui";
import { Link } from "expo-router";

export default function OverviewScreen() {
  return (
    <YStack flex={1} alignItems="center" justifyContent="center">
      <Link href="/decks">Go to decks</Link>
      <Link href="/decks/create">Go to decks create</Link>
    </YStack>
  );
}
