import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { ScrollView, View, YStack } from 'tamagui';

import { CardListContainer } from './card-list';
import { Button, Icon } from '../../components';
import { DeckScreenParams } from '../../types';

export function DeckScreen() {
  const params = useLocalSearchParams<DeckScreenParams>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView p="$4" flex={1}>
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
                  <Icon name="Plus" />
                </TouchableOpacity>
              </Link>
            ),
          }}
        />
        <YStack gap="$4">
          <CardListContainer label={params.name} deckId={params.id} />
        </YStack>
      </ScrollView>
      <View px="$4">
        <Link href={{ pathname: '/(home)/decks/[id]/review', params }} asChild>
          <Button withElevationShadow position="fixed" bottom={20} left={0}>
            Review
          </Button>
        </Link>
      </View>
    </SafeAreaView>
  );
}
