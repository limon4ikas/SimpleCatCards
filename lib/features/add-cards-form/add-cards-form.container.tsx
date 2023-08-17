import { useRouter } from 'expo-router';
import { YStack } from 'tamagui';

import { AddCardsForm, AddCardsFormT } from './add-cards-form.component';
import { useAddCardsMutation } from './add-cards-form.hooks';

type AddCardsFormContainerProps = { deckId: string };

export function AddCardsFormContainer({ deckId }: AddCardsFormContainerProps) {
  const router = useRouter();
  const createCards = useAddCardsMutation();

  async function handleSubmit(values: AddCardsFormT) {
    await createCards.mutateAsync({ deckId, cards: values.cards });

    router.back();
  }

  return (
    <YStack p="$4">
      <AddCardsForm onSubmit={handleSubmit} />
    </YStack>
  );
}
