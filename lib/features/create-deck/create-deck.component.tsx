import { Button, Text, YStack } from "tamagui";

import { CardModel } from "../../types";

export type CreateDeckFormProps = {
  onSubmit: (cards: CardModel[]) => void;
};

export function CreateDeckForm(props: CreateDeckFormProps) {
  return (
    <YStack flex={1} gap="$4">
      <Text>CreateDeckForm</Text>
      <Button
        fontFamily="$rounded"
        fontSize={18}
        backgroundColor="$blue10"
        color="white"
        fontWeight="500"
        animation="lazy"
        pressStyle={{ scale: 0.95 }}
      >
        Submit
      </Button>
    </YStack>
  );
}
