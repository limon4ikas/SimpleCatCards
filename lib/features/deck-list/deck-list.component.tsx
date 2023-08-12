import { Input, Text, XStack, YStack } from "tamagui";
import { TouchableOpacity } from "react-native";
import { differenceInDays } from "date-fns";
import { Link } from "expo-router";

import { DeckModel } from "../../types";
import { useDeckList } from "./deck-list.hooks";

export type DeckListProps = {
  label: string;
  decks: DeckModel[];
};

export function DeckList(props: DeckListProps) {
  const { label, decks } = props;
  const { filterName, setFilterName, filteredDecks } = useDeckList({ decks });

  return (
    <YStack space="$3.5">
      <Input
        flex={1}
        size="$3"
        placeholder="Search..."
        value={filterName}
        onChangeText={setFilterName}
      />
      <XStack justifyContent="flex-start">
        <Text fontSize={24} fontWeight="bold" fontFamily="$heading">
          {label}
        </Text>
      </XStack>

      <YStack space="$2" bg="white" borderRadius="$6">
        {filteredDecks.map((deck) => (
          <DeckListItem
            key={deck.id}
            id={deck.id}
            name={deck.name}
            cardsCount={deck.cards.length}
            lastEdited={deck.lastEdited}
            lastAttempted={deck.lastAttempted}
          />
        ))}
      </YStack>
    </YStack>
  );
}

type DeckListItemProps = {
  id: string;
  name: string;
  cardsCount: number;
  lastEdited: Date;
  lastAttempted?: Date;
};

function DeckListItem(props: DeckListItemProps) {
  const { cardsCount, lastAttempted, lastEdited, name } = props;

  return (
    <Link href={{ pathname: "/deck/[id]", params: { id: name } }} asChild>
      <TouchableOpacity>
        <YStack space="$2" px="$4" py="$2">
          <XStack>
            <Text>{name}</Text>
          </XStack>

          <XStack justifyContent="space-between">
            <XStack space="$2">
              <Text>{cardsCount}</Text>
              <Text>{differenceInDays(lastEdited, new Date())}</Text>
            </XStack>
            {lastAttempted ? (
              <Text>{differenceInDays(lastAttempted, new Date())}</Text>
            ) : null}
          </XStack>
        </YStack>
      </TouchableOpacity>
    </Link>
  );
}
