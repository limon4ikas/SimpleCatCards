import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { ComponentProps } from 'react';
import { Button, Text } from 'tamagui';

import { CreateDeckForm, CreateDeckFormT } from './create-deck.component';
import { useCreateDeckMutation } from './create-deck.hooks';

export function CreateDeckButtonContainer() {
  const router = useRouter();

  function handleCreateDeckPress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/decks/create');
  }

  return (
    <CreateDeckButton label="Create Deck" onPress={handleCreateDeckPress} />
  );
}

export function CreateDeckFormContainer() {
  const router = useRouter();
  const createDeck = useCreateDeckMutation();

  async function handleCardFormSubmit(values: CreateDeckFormT) {
    createDeck.mutate(values);
    router.back();
  }

  if (createDeck.error) return <Text>{createDeck.error.message}</Text>;

  return <CreateDeckForm onSubmit={handleCardFormSubmit} />;
}

function CreateDeckButton(
  props: Omit<ComponentProps<typeof Button>, 'children'> & { label: string },
) {
  return (
    <Button
      backgroundColor="$blue10"
      color="white"
      pressStyle={{ scale: 0.95 }}
      animation="quick"
      fontFamily="$rounded"
      fontWeight="600"
      fontSize={17}
      shadowColor="$shadowColor"
      shadowOffset={{ width: 0, height: 8 }}
      shadowOpacity={0.1}
      shadowRadius={18}
      {...props}
    >
      {props.label}
    </Button>
  );
}
