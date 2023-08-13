import { Input, Text, View, XStack, YStack } from "tamagui";
import { TouchableOpacity } from "react-native";
import { differenceInDays } from "date-fns";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";

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
        <Text fontSize="$9" fontWeight="700">
          {label}
        </Text>
      </XStack>

      <YStack space="$2" borderRadius="$6">
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
    <View bg="white" borderRadius="$5">
      <Animated.View entering={SlideInRight} exiting={SlideOutLeft}>
        <Link href={{ pathname: "/deck/[id]", params: { id: name } }} asChild>
          <TouchableOpacity>
            <YStack space="$2" px="$4" py="$2">
              <XStack>
                <Text fontFamily="$body" fontSize="$5" fontWeight="600">
                  {name}
                </Text>
              </XStack>

              <XStack justifyContent="space-between">
                <XStack space="$2">
                  <XStack alignItems="center" gap="$2">
                    <Feather name="layers" size={14} />
                    <Text fontFamily="$body" fontSize="$4">
                      {cardsCount}
                    </Text>
                  </XStack>

                  <XStack alignItems="center" gap="$2">
                    <Feather name="edit" size={14} />
                    <Text fontFamily="$body" fontSize="$4">
                      {differenceInDays(lastEdited, new Date())}d ago
                    </Text>
                  </XStack>
                </XStack>
                {lastAttempted ? (
                  <Text fontFamily="$body" fontSize="$4">
                    {differenceInDays(lastAttempted, new Date())}d ago
                  </Text>
                ) : null}
              </XStack>
            </YStack>
          </TouchableOpacity>
        </Link>
      </Animated.View>
    </View>
  );
}
