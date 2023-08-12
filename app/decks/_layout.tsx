import { Slot } from "expo-router";
import { ScrollView, YStack } from "tamagui";

export default function DecksLayout() {
  return (
    <ScrollView flex={1}>
      <YStack flex={1} paddingTop="$4">
        <Slot />
      </YStack>
    </ScrollView>
  );
}
