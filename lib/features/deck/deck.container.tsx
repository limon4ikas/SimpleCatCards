import { View, Text } from "tamagui";

export type DeckContainerProps = {
  id: string;
};

export function DeckContainer(props: DeckContainerProps) {
  return (
    <View>
      <Text>Deck</Text>
      <Text>{props.id}</Text>
    </View>
  );
}
