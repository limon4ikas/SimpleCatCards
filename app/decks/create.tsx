import { Platform } from "react-native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { YStack } from "tamagui";

import { CreateDeckFormContainer } from "../../lib/features/create-deck";

export default function ModalScreen() {
  const router = useRouter();
  const isPresented = router.canGoBack();

  return (
    <YStack flex={1} p="$4">
      <CreateDeckFormContainer />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </YStack>
  );
}
