import { Link } from "expo-router";
import { View, YStack, Text } from "tamagui";

export function OverviewContainer() {
  return (
    <View>
      <YStack space="$4">
        <Text>Overview container</Text>
        <Link href="/decks">Go to decks</Link>
        <Link href="/">Go to overview</Link>
      </YStack>
    </View>
  );
}
