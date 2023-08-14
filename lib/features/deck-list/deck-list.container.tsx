import { ActivityIndicator, Alert } from 'react-native';
import { Text } from 'tamagui';

import { DeckList } from './deck-list.component';
import { useQueryDecks } from './deck-list.hooks';

export function DeckListContainer() {
  const { data, status, error } = useQueryDecks('');

  const handleDeckDelete = (deckId: string) => {
    Alert.alert(
      'Do you want to delete deck?',
      'Are you sure you want to delete this deck?',
      [
        { text: 'Yes', onPress: () => {} },
        { text: 'No', style: 'cancel' },
      ],
    );
  };

  if (status === 'loading') return <ActivityIndicator />;

  if (status === 'error') return <Text>{error.message}</Text>;

  return (
    <DeckList label="Your decks" decks={data} onDeckDelete={handleDeckDelete} />
  );
}
