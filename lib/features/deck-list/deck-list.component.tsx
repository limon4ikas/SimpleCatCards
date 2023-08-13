import { useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { Input, Text, View, XStack, YStack, getTokens } from "tamagui";
import { differenceInDays } from "date-fns";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { DeckModel } from "../../types";
import { useDeckList } from "./deck-list.hooks";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export type DeckListProps = {
  label: string;
  decks: DeckModel[];
  onDeckDelete?: (deckId: string) => void;
};

export function DeckList(props: DeckListProps) {
  const { label, decks, onDeckDelete } = props;
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
        {filteredDecks.map((deck, idx) => (
          <DeckListItem
            index={idx}
            key={deck.id}
            id={deck.id}
            name={deck.name}
            cardsCount={deck.cards.length}
            lastEdited={deck.lastEdited}
            lastAttempted={deck.lastAttempted}
            onDelete={onDeckDelete}
          />
        ))}
      </YStack>
    </YStack>
  );
}

const WIDTH = Dimensions.get("screen").width;
const THRESHOLD = -WIDTH / 4;
const SPACE_FOR_BUTTON = THRESHOLD / 2;

type DeckListItemProps = {
  index: number;
  id: string;
  name: string;
  cardsCount: number;
  lastEdited: Date;
  lastAttempted?: Date;
  onDelete?: (id: string) => void;
};

function DeckListItem(props: DeckListItemProps) {
  const { cardsCount, lastAttempted, lastEdited, name, onDelete, id, index } =
    props;
  const [isDisabled, setIsDisabled] = useState(false);
  const x = useSharedValue(0);
  const offsetX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => runOnJS(() => setIsDisabled(true)))
    .onUpdate((e) => (x.value = e.translationX + offsetX.value))
    .onFinalize((e) => {
      const shouldOpenButton = e.translationX > THRESHOLD && e.translationX < 0;

      // Reset to initial
      if (!shouldOpenButton) {
        x.value = withSpring(0);
        offsetX.value = 0;
        return;
      }

      // Open delete button
      x.value = withSpring(SPACE_FOR_BUTTON);
      offsetX.value = SPACE_FOR_BUTTON;
    })
    .onEnd(() => runOnJS(() => setIsDisabled(false)));

  const xTransform = useAnimatedStyle(() => {
    return { transform: [{ translateX: x.value }] };
  });

  return (
    <Animated.View
      entering={FadeIn.delay(200 * index + 1)}
      exiting={FadeOut}
      layout={Layout.delay(100)}
    >
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[{ position: "relative", zIndex: 1 }, xTransform]}
        >
          <View
            bg="white"
            shadowColor="black"
            shadowOffset={{ width: 0, height: 20 }}
            shadowOpacity={0.15}
            shadowRadius={10}
            borderRadius="$5"
          >
            <Link
              href={{ pathname: "/deck/[id]", params: { id: name } }}
              asChild
              disabled={isDisabled}
            >
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
          </View>
        </Animated.View>
      </GestureDetector>
      <View position="absolute" right={10} top="30%">
        <TouchableOpacity onPress={() => onDelete?.(id)}>
          <Feather
            name="trash"
            size={24}
            color={getTokens().color.red10Light.val}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
