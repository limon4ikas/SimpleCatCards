import { SuperMemoGrade, supermemo } from 'supermemo';

import { ReviewSession } from './review.component';
import { usePractiseCardMutation } from './review.hooks';
import { Text } from '../../components';
import { FlashcardsResponse } from '../../types';
import { useCardListQuery } from '../deck/card-list/card-list.hooks';

const getSortedCards = (cards: FlashcardsResponse[]) => {
  return cards.sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
  );
};

type ReviewContainerProps = {
  deckId: string;
};

export function ReviewContainer({ deckId }: ReviewContainerProps) {
  const { data, status, error } = useCardListQuery(deckId);
  const practice = usePractiseCardMutation();

  function handlePractiseCard(grade: SuperMemoGrade, card: FlashcardsResponse) {
    const result = supermemo(card, grade);

    practice.mutate({ deckId, cardId: card.id, update: result });
  }

  if (status === 'loading') return <Text>Loading...</Text>;

  if (status === 'error') return <Text>{error.message}</Text>;

  const cards = data?.expand?.cards;

  if (!cards) return <Text>No cards!!!</Text>;

  return (
    <ReviewSession
      cards={getSortedCards(cards)}
      onCardGrade={handlePractiseCard}
    />
  );
}
