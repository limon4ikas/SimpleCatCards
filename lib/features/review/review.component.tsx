import { ComponentProps, useReducer } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SuperMemoGrade } from 'supermemo';
import { View, XStack, YStack, getTokens, useWindowDimensions } from 'tamagui';

import { useFlipCardAnimation } from './review.hooks';
import { Text } from '../../components';
import { FlashcardsResponse } from '../../types';

type ReviewAction = { type: 'flip' } | { type: 'next' };

type ReviewState = {
  cardState: 'flipped' | 'initial';
  barState: BottomBarState;
  currentCardIndex: number;
  currentCard?: FlashcardsResponse;
  cards: FlashcardsResponse[];
};

function reducer(state: ReviewState, action: ReviewAction): ReviewState {
  switch (action.type) {
    case 'flip':
      return {
        ...state,
        cardState: state.cardState === 'flipped' ? 'initial' : 'flipped',
        barState: 'grade-visible',
      };
    case 'next': {
      const maybeNextCard = state.cards?.[state.currentCardIndex + 1];

      return {
        ...state,
        currentCard: maybeNextCard,
        currentCardIndex: state.currentCardIndex + 1,
        barState: maybeNextCard ? 'flip-visible' : 'hidden',
        cardState: 'initial',
      };
    }
    default:
      return state;
  }
}

export type ReviewProps = {
  cards: FlashcardsResponse[];
  onCardGrade: (grade: Grade['grade'], card: FlashcardsResponse) => void;
};

export function ReviewSession({ cards, onCardGrade }: ReviewProps) {
  const [state, dispatch] = useReducer(reducer, {
    cardState: 'initial',
    barState: 'flip-visible',
    currentCardIndex: 0,
    cards,
    currentCard: cards?.[0],
  });

  const { backStyle, frontStyle } = useFlipCardAnimation(
    state.cardState === 'flipped',
  );

  function handleGradeChoice(grade: Grade) {
    dispatch({ type: 'next' });

    if (!state.currentCard) return;

    onCardGrade(grade.grade, state.currentCard);
  }

  function handleCardPress() {
    dispatch({ type: 'flip' });
  }

  function handleFlipPress() {
    dispatch({ type: 'flip' });
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
      <YStack flex={1} justifyContent="center" alignItems="center">
        {state.currentCard ? (
          <ReviewCard
            state={state.cardState}
            front={state.currentCard.front}
            back={state.currentCard.back}
            frontStyle={frontStyle}
            backStyle={backStyle}
            onPress={handleCardPress}
          />
        ) : (
          <SessionStats />
        )}
      </YStack>
      <GradeChoice
        state={state.barState}
        onGradeChoice={handleGradeChoice}
        onFlipPress={handleFlipPress}
      />
    </SafeAreaView>
  );
}

type ReviewCardProps = {
  state: 'initial' | 'flipped';
  front: string;
  back: string;
  frontStyle: ComponentProps<typeof Animated.View>['style'];
  backStyle: ComponentProps<typeof Animated.View>['style'];
  onPress: () => void;
};

function ReviewCard(props: ReviewCardProps) {
  const { front, back, onPress, frontStyle, backStyle } = props;
  const dimensions = useWindowDimensions();

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        {/* FRONT */}
        <Animated.View
          style={[
            styles.front,
            frontStyle,
            { width: dimensions.width * 0.8, height: dimensions.height * 0.35 },
          ]}
        >
          <Text type="title-3">{front}</Text>
        </Animated.View>
        {/* BACK */}
        <Animated.View
          style={[
            styles.back,
            backStyle,
            { width: dimensions.width * 0.8, height: dimensions.height * 0.35 },
          ]}
        >
          <YStack
            flex={1}
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <View
              flex={1}
              width="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Text type="title-3">{front}</Text>
            </View>
            <View width="100%" bg="$gray3" height={2} />
            <View
              flex={1}
              width="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Text type="title-3">{back}</Text>
            </View>
          </YStack>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  front: {
    borderRadius: 16,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    backgroundColor: 'white',
    shadowColor: '$shadowColor',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevationAndroid: 15,
  },
  back: {
    borderRadius: 16,
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '$shadowColor',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevationAndroid: 15,
  },
});

type Grade = {
  label: string;
  grade: SuperMemoGrade;
  color: string;
};

type BottomBarState = 'grade-visible' | 'flip-visible' | 'hidden';

type GradeChoiceProps = {
  state: BottomBarState;
  onGradeChoice: (grade: Grade) => void;
  onFlipPress: () => void;
};

function GradeChoice({ state, onGradeChoice, onFlipPress }: GradeChoiceProps) {
  const GRADE_CHOICES: Grade[] = [
    { label: 'Fail', grade: 1, color: getTokens().color.red10Light.val },
    { label: 'Hard', grade: 2, color: getTokens().color.yellow10Light.val },
    { label: 'Good', grade: 3, color: getTokens().color.blue10Light.val },
    { label: 'Easy', grade: 4, color: getTokens().color.green10Light.val },
  ];

  if (state === 'hidden') return null;

  return (
    <XStack
      borderTopWidth={1}
      borderTopColor="$gray3"
      px="$4"
      py="$2"
      justifyContent="space-evenly"
      alignItems="center"
      height={55}
    >
      {state === 'grade-visible' ? (
        GRADE_CHOICES.map((grade) => (
          <Animated.View key={grade.grade} entering={FadeIn} exiting={FadeOut}>
            <View
              px="$2"
              bg={grade.color}
              borderRadius="$3"
              py="$2"
              paddingHorizontal="$4"
            >
              <TouchableOpacity onPress={() => onGradeChoice(grade)}>
                <Text type="title-3" color="white">
                  {grade.label}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ))
      ) : state === 'flip-visible' ? (
        <Animated.View entering={FadeIn.delay(200)} exiting={FadeOut}>
          <TouchableOpacity onPress={onFlipPress}>
            <Text type="headline" color="$blue9">
              FLIP
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ) : null}
    </XStack>
  );
}

type SessionStatsProps = object;

function SessionStats(props: SessionStatsProps) {
  return (
    <YStack>
      <Text type="title-1">Session Stats</Text>
    </YStack>
  );
}
