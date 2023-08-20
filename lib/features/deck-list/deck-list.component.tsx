import { Feather } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'expo-router';
import { ReactNode, useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  FadeOut,
  Layout,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { View, XStack, YStack, getTokens } from 'tamagui';

import { useDeckList } from './deck-list.hooks';
import { Card, Icon, Text, TextInput } from '../../components';
import { DecksResponse } from '../../types';

export type DeckListProps = {
  label: ReactNode;
  decks: DecksResponse[];
  onDeckDelete?: (deckId: string) => void;
  withSearch?: boolean;
};

export function DeckList(props: DeckListProps) {
  const { label, decks, withSearch, onDeckDelete } = props;
  const { filterName, setFilterName, filteredDecks } = useDeckList({ decks });

  return (
    <YStack space="$3.5">
      {withSearch ? (
        <TextInput
          placeholder="Search..."
          value={filterName}
          onChangeText={setFilterName}
        />
      ) : null}
      <XStack justifyContent="flex-start">{label}</XStack>

      <YStack space="$2" borderRadius="$6">
        {filteredDecks.map((deck, _idx) => (
          <DeckListItem
            key={deck.id}
            id={deck.id}
            name={deck.name}
            cardsCount={deck.cards.length}
            lastEdited={new Date(deck.lastEdited)}
            lastAttempted={
              deck.lastAttempted ? new Date(deck.lastAttempted) : undefined
            }
            onDelete={onDeckDelete}
            color={deck.color}
          />
        ))}
      </YStack>
    </YStack>
  );
}

const WIDTH = Dimensions.get('screen').width;
const THRESHOLD = -WIDTH / 4;
const SPACE_FOR_BUTTON = THRESHOLD / 2;

type DeckListItemProps = {
  id: string;
  name: string;
  cardsCount: number;
  lastEdited: Date;
  lastAttempted?: Date;
  onDelete?: (id: string) => void;
  color?: string;
};

function DeckListItem(props: DeckListItemProps) {
  const { cardsCount, lastAttempted, lastEdited, name, onDelete, id, color } =
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
    <Animated.View exiting={FadeOut} layout={Layout.delay(100)}>
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[{ position: 'relative', zIndex: 1 }, xTransform]}
        >
          <Card size="large">
            <Link
              href={{
                pathname: '/(home)/decks/[id]/',
                params: { id, name },
              }}
              asChild
              disabled={isDisabled}
            >
              <TouchableOpacity>
                <YStack space="$2.5">
                  <Text type="title-3" color={color}>
                    {name}
                  </Text>

                  <XStack justifyContent="space-between">
                    <XStack space="$2">
                      <XStack alignItems="center" gap="$2">
                        <Feather name="layers" size={14} />
                        <Text type="footnote">{cardsCount}</Text>
                      </XStack>

                      <XStack alignItems="center" gap="$2">
                        <Feather name="edit" size={14} />
                        <Text type="footnote">
                          {formatDistanceToNow(lastEdited)} ago
                        </Text>
                      </XStack>
                    </XStack>
                    <Text type="footnote">
                      {lastAttempted
                        ? `${formatDistanceToNow(lastAttempted)} ago`
                        : null}
                    </Text>
                  </XStack>
                </YStack>
              </TouchableOpacity>
            </Link>
          </Card>
        </Animated.View>
      </GestureDetector>
      <View position="absolute" right={10} top="30%">
        <TouchableOpacity onPress={() => onDelete?.(id)}>
          <Icon
            name="Trash"
            size={24}
            color={getTokens().color.$red10Light.val}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
