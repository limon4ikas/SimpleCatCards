import { Slot } from "expo-router";
import { SafeAreaView } from "../../lib/components";

export default function HomeLayout() {
  return (
    <SafeAreaView flex={1}>
      <Slot />
    </SafeAreaView>
  );
}
