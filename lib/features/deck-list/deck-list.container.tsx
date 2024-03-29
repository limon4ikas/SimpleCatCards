import { ActivityIndicator, Alert } from 'react-native';

import { DeckList } from './deck-list.component';
import { useUserDecks, useUserDeckDelete } from './deck-list.hooks';
import { Text } from '../../components';

export function DeckListContainer() {
  const { data, status, error } = useUserDecks();
  const deleteDeck = useUserDeckDelete();

  const handleDeckDelete = (deckId: string) => {
    Alert.alert(
      'Do you want to delete deck?',
      'Are you sure you want to delete this deck?',
      [
        { text: 'Yes', onPress: () => deleteDeck.mutate(deckId) },
        { text: 'No', style: 'cancel' },
      ],
    );
  };

  if (status === 'loading') return <ActivityIndicator />;

  if (status === 'error') return <Text>{error.message}</Text>;

  return (
    <DeckList
      label={<Text type="large-title">Your decks</Text>}
      decks={data}
      onDeckDelete={handleDeckDelete}
      withSearch
    />
  );
}
