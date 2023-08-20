import { useReducer } from 'react';
import { SafeAreaView } from 'react-native';
import { YStack } from 'tamagui';

import { GradeChoice, ReviewCard, SessionStats } from './components';
import { useFlipCardAnimation } from './review.hooks';
import { BottomBarState, Grade } from './review.types';
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
