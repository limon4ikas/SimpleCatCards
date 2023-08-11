import { YStack } from "tamagui";

import { DeckList } from "./deck-list.component";

export function DeckListContainer() {
  return (
    <YStack space="$4" px="$4">
      <DeckList
        label="Your decks"
        decks={[
          {
            id: "Finnish",
            name: "Finnish words",
            cards: [],
            cardsCount: 10,
            lastAttempted: new Date(),
            lastEdited: new Date(),
          },
          {
            id: "English",
            name: "English words",
            cards: [],
            cardsCount: 10,
            lastAttempted: new Date(),
            lastEdited: new Date(),
          },
        ]}
      />
    </YStack>
  );
}
