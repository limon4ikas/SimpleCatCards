import { Slot } from "expo-router";
import { SafeAreaView } from "../../lib/components";
import { Text, View } from "tamagui";

export default function HomeLayout() {
  return (
    <>
      <SafeAreaView flex={1}>
        <Slot />
      </SafeAreaView>
      <View backgroundColor="white" h={50}>
        <Text alignSelf="center">Bottom</Text>
      </View>
    </>
  );
}
