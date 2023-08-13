import { YStack } from "tamagui";

import { DeckList } from "./deck-list.component";
import { useState } from "react";
import { DeckModel } from "../../types";

export function DeckListContainer() {
  const [decks, setDecks] = useState<DeckModel[]>([
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
  ]);

  const handleDeckDelete = (deckId: string) => {
    setDecks(decks.filter((d) => d.id !== deckId));
  };

  return (
    <YStack space="$4" px="$4">
      <DeckList
        label="Your decks"
        decks={decks}
        onDeckDelete={handleDeckDelete}
      />
    </YStack>
  );
}
