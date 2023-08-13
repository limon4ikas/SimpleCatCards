import { ComponentProps } from "react";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import Animated, { Layout } from "react-native-reanimated";
import { Button, Text } from "tamagui";
import { CreateDeckForm } from "./create-deck.component";

export function CreateDeckButtonContainer() {
  const router = useRouter();

  function handleCreateDeckPress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/decks/create");
  }

  return (
    <Animated.View layout={Layout}>
      <CreateDeckButton onPress={handleCreateDeckPress} />
    </Animated.View>
  );
}

export function CreateDeckFormContainer() {
  return <CreateDeckForm />;
}

function CreateDeckButton(props: ComponentProps<typeof Button>) {
  return (
    <Button
      backgroundColor="$blue10"
      color="white"
      pressStyle={{ scale: 0.95 }}
      animation="quick"
      fontFamily="$rounded"
      fontWeight="600"
      fontSize={17}
      {...props}
    >
      Create Deck
    </Button>
  );
}
