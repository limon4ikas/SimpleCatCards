import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, TouchableOpacity } from 'react-native';
import { Text, YStack } from 'tamagui';

import { CreateDeckFormContainer } from '../../../lib/features/create-deck';

export default function CreateDeckScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Create Deck',
          headerTitleStyle: {
            fontFamily: 'SFProRoundedSemibold',
            fontWeight: '600',
            fontSize: 19,
          },
          headerLeft: () => (
            <TouchableOpacity>
              <Text
                fontFamily="$rounded"
                fontWeight="600"
                fontSize={16}
                color="$blue10"
                bg="white"
                onPress={router.back}
              >
                Close
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <YStack flex={1} p="$4">
        <CreateDeckFormContainer />
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </YStack>
    </>
  );
}
