import { useRouter } from 'expo-router';

import { AddCardsForm, AddCardsFormT } from './add-cards-form.component';
import { useAddCardsMutation } from './add-cards-form.hooks';

type AddCardsFormContainerProps = { deckId: string };

export function AddCardsFormContainer({ deckId }: AddCardsFormContainerProps) {
  const router = useRouter();
  const createCards = useAddCardsMutation();

  async function handleSubmit(values: AddCardsFormT) {
    await createCards.mutateAsync({
      deckId,
      cards: values.cards.filter(
        (card) => card.front.length && card.back.length,
      ),
    });

    router.back();
  }

  return <AddCardsForm onSubmit={handleSubmit} />;
}
