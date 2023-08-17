import {
  Link,
  Stack,
  useGlobalSearchParams,
  useLocalSearchParams,
} from 'expo-router';
import { Plus } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { ScrollView, YStack } from 'tamagui';

import { CardListContainer } from './card-list';
import { DeckScreenParams } from '../../types';

export function DeckScreen() {
  const params = useGlobalSearchParams<DeckScreenParams>();

  console.log('GLOBAL', useGlobalSearchParams());
  console.log('LOCAL', useLocalSearchParams());

  return (
    <>
      <ScrollView p="$4">
        <Stack.Screen
          options={{
            title: params.name,
            headerRight: (props) => (
              <Link
                href={{
                  pathname: '/(home)/decks/[id]/create',
                  params: { id: params.id, name: params.name },
                }}
                asChild
              >
                <TouchableOpacity {...props}>
                  <Plus />
                </TouchableOpacity>
              </Link>
            ),
          }}
        />
        <YStack gap="$4">
          <CardListContainer label={params.name} deckId={params.id} />
        </YStack>
      </ScrollView>
    </>
  );
}
