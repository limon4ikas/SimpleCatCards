import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { ComponentProps } from 'react';
import Animated, { Layout } from 'react-native-reanimated';
import { Button } from 'tamagui';

import { CreateDeckForm, CreateDeckFormT } from './create-deck.component';

export function CreateDeckButtonContainer() {
  const router = useRouter();

  function handleCreateDeckPress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/decks/create');
  }

  return (
    <Animated.View layout={Layout}>
      <CreateDeckButton label="Create Deck" onPress={handleCreateDeckPress} />
    </Animated.View>
  );
}

export function CreateDeckFormContainer() {
  const router = useRouter();

  function handleCardFormSubmit(values: CreateDeckFormT) {
    // Needed for closing modal and correct navigation
    router.back();
    router.replace({ pathname: '/deck/[id]', params: { id: values.name } });
  }

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
