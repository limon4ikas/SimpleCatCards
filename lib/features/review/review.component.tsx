import { ComponentProps, useReducer } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { SuperMemoGrade } from 'supermemo';
import { View, XStack, YStack, getTokens } from 'tamagui';

import { useFlipCardAnimation } from './review.hooks';
import { Text } from '../../components';
import { FlashcardsResponse } from '../../types';

type ReviewAction = { type: 'flip' } | { type: 'next' };

type ReviewState = {
  isFlipped: boolean;
  cardState: 'flipped' | 'initial';
  currentCardIndex: number;
};

const initialState: ReviewState = {
  cardState: 'initial',
  isFlipped: false,
  currentCardIndex: 0,
};

function reducer(state: ReviewState, action: ReviewAction): ReviewState {
  switch (action.type) {
    case 'flip':
      return { ...state, isFlipped: !state.isFlipped, cardState: 'flipped' };
    case 'next':
      return {
        ...state,
        currentCardIndex: state.currentCardIndex + 1,
        isFlipped: false,
        cardState: 'initial',
      };
    default:
      return state;
  }
}

export type ReviewProps = {
  cards: FlashcardsResponse[];
  onCardGrade: (grade: Grade['grade'], card: FlashcardsResponse) => void;
};

export function ReviewSession({ cards, onCardGrade }: ReviewProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { backStyle, frontStyle } = useFlipCardAnimation(state.isFlipped);
  const maybeCurrentCard = cards[state.currentCardIndex];

  function handleGradeChoice(grade: Grade) {
    dispatch({ type: 'next' });
    onCardGrade(grade.grade, maybeCurrentCard);
  }

  function handleCardPress() {
    dispatch({ type: 'flip' });
  }

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Animated.View>
        {maybeCurrentCard ? (
          <ReviewCard
            state={state.cardState}
            front={maybeCurrentCard.front}
            back={maybeCurrentCard.back}
            frontStyle={frontStyle}
            backStyle={backStyle}
            onPress={handleCardPress}
          />
        ) : null}
      </Animated.View>
      <Animated.View
        style={[{ position: 'absolute', bottom: 0, left: 0, width: '100%' }]}
      >
        {state.cardState === 'flipped' ? (
          <GradeChoice onGradeChoice={handleGradeChoice} />
        ) : null}
      </Animated.View>
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

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        {/* FRONT */}
        <Animated.View style={[styles.front, frontStyle]}>
          <Text>{front}</Text>
        </Animated.View>
        {/* BACK */}
        <Animated.View style={[styles.back, backStyle]}>
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
              <Text>{front}</Text>
            </View>
            <View width="100%" bg="$gray3" height={2} />
            <View
              flex={1}
              width="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Text>{back}</Text>
            </View>
          </YStack>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  front: {
    height: 350,
    width: Dimensions.get('window').width * 0.8,
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
    height: 350,
    width: Dimensions.get('window').width * 0.8,
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

type GradeChoiceProps = {
  onGradeChoice: (grade: Grade) => void;
};

function GradeChoice(props: GradeChoiceProps) {
  const GRADE_CHOICES: Grade[] = [
    { label: 'Fail', grade: 1, color: getTokens().color.red10Light.val },
    { label: 'Hard', grade: 2, color: getTokens().color.red10Light.val },
    { label: 'Good', grade: 3, color: getTokens().color.red10Light.val },
    { label: 'Easy', grade: 4, color: getTokens().color.red10Light.val },
  ];

  return (
    <XStack bg="red" px="$4" py="$2" justifyContent="space-evenly">
      {GRADE_CHOICES.map((grade) => (
        <View
          key={grade.grade}
          px="$2"
          bg="yellow"
          py="$2"
          paddingHorizontal="$4"
        >
          <TouchableOpacity onPress={() => props.onGradeChoice(grade)}>
            <Text>{grade.label}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </XStack>
  );
}
