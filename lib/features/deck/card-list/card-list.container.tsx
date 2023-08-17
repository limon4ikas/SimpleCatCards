import { View, YStack } from 'tamagui';

import { CardList } from './card-list.component';
import { useCardListQuery } from './card-list.hooks';
import { Text } from '../../../components';

export type CardListContainerProps = {
  label: string;
  deckId: string;
};

export function CardListContainer({ deckId, label }: CardListContainerProps) {
  const { data, status, error } = useCardListQuery(deckId);

  if (status === 'loading') return <Text>Loading...</Text>;

  if (status === 'error') return <Text>{error.message}</Text>;

  return (
    <YStack gap="$4">
      <YStack gap="$1.5">
        <Text type="large-title" color={data.color}>
          {label}
        </Text>
        <Text type="subhead">{data.description}</Text>
      </YStack>
      <CardList cards={data.expand?.cards} />
    </YStack>
  );
}
