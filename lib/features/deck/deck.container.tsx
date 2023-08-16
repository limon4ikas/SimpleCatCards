import { View } from 'tamagui';

import { AddCardsFormContainer } from './add-cards-form';

export type DeckContainerProps = {
  name: string;
  id: string;
};

export function DeckContainer(props: DeckContainerProps) {
  return (
    <View>
      <AddCardsFormContainer />
    </View>
  );
}
