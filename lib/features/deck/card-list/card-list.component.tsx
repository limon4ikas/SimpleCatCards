import { Layers } from 'lucide-react-native';
import { XStack, YStack, getTokenValue } from 'tamagui';

import { Card, Text } from '../../../components';
import { FlashcardsResponse } from '../../../types';

export type CardListProps = {
  cards?: FlashcardsResponse[];
};

export function CardList({ cards }: CardListProps) {
  if (!cards) return <Text>No cards...</Text>;

  return (
    <YStack>
      <XStack justifyContent="space-between" alignItems="center">
        <Text type="title-1" marginBottom="$4">
          Cards
        </Text>
        <XStack alignItems="center" gap="$2">
          <Layers size={24} color={getTokenValue('$blue10Light', 'color')} />
          <Text type="headline">{cards.length} cards</Text>
        </XStack>
      </XStack>
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
    <Card size="large">
      <Text>{front}</Text>
    </Card>
  );
}
