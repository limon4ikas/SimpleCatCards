import { YStack } from 'tamagui';

import { Text } from '../../../components';
import { FlashcardsResponse } from '../../../types';

export type CardListProps = { cards?: FlashcardsResponse[] };

export function CardList({ cards }: CardListProps) {
  if (!cards) return <Text>No cards...</Text>;

  return (
    <YStack>
      <Text>Card list</Text>
      <YStack>
        {cards.map((card) => (
          <CardListItem key={card.id} back={card.back} front={card.front} />
        ))}
      </YStack>
    </YStack>
  );
}

export type CardListItemProps = {
  front: string;
  back: string;
};

function CardListItem(props: CardListItemProps) {
  const { front, back } = props;

  return (
    <YStack>
      <Text>{front}</Text>
    </YStack>
  );
}
