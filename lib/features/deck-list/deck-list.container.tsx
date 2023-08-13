import { addDays } from 'date-fns';
import { useState } from 'react';
import { Alert } from 'react-native';
import Animated, { Layout } from 'react-native-reanimated';
import { getTokens } from 'tamagui';

import { DeckList } from './deck-list.component';
import { DeckModel } from '../../types';

export function DeckListContainer() {
  const [decks, setDecks] = useState<DeckModel[]>([
    {
      id: 'Finnish',
      name: 'Finnish words',
      cards: [{ id: '1', question: 'Hauska', answer: 'Funny' }],
      lastAttempted: addDays(new Date(), -2),
      lastEdited: addDays(new Date(), -8),
      color: getTokens().color.$red10Light.val,
    },
    {
      id: 'English',
      name: 'English words',
      cards: [],
      lastAttempted: addDays(new Date(), -40),
      lastEdited: addDays(new Date(), -1),
      color: getTokens().color.$blue10Light.val,
    },
  ]);

  const handleDeckDelete = (deckId: string) => {
    Alert.alert(
      'Do you want to delete deck?',
      'Are you sure you want to delete this deck?',
      [
        {
          text: 'Yes',
          onPress: () => setDecks(decks.filter((d) => d.id !== deckId)),
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <Animated.View layout={Layout} style={{ gap: 16 }}>
      <DeckList
        label="Your decks"
        decks={decks}
        onDeckDelete={handleDeckDelete}
      />
    </Animated.View>
  );
}
