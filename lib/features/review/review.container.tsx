import { Review } from './review.component';
import { Text } from '../../components';
import { useCardListQuery } from '../deck/card-list/card-list.hooks';

type ReviewContainerProps = {
  deckId: string;
};

export function ReviewContainer({ deckId }: ReviewContainerProps) {
  const { data, status, error } = useCardListQuery(deckId);

  if (status === 'loading') return <Text>Loading...</Text>;

  if (status === 'error') return <Text>{error.message}</Text>;

  return <Review />;
}
