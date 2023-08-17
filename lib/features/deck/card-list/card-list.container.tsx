import { CardList } from './card-list.component';
import { useCardListQuery } from './card-list.hooks';
import { Text } from '../../../components';

export type CardListContainerProps = { deckId: string };

export function CardListContainer({ deckId }: CardListContainerProps) {
  const { data, status, error } = useCardListQuery(deckId);

  if (status === 'loading') return <Text>Loading...</Text>;

  if (status === 'error') return <Text>{error.message}</Text>;

  return <CardList cards={data.expand?.cards} />;
}
