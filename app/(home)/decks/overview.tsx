import { Link } from 'expo-router';
import { ScrollView, Text, XStack, YStack } from 'tamagui';

import {
  RecentlyReviewedContainer,
  WeeklyGoalContainer,
  WeeklyProgressContainer,
} from '../../../lib/features';

export default function OverviewScreen() {
  return (
    <ScrollView flex={1}>
      <YStack p="$4" gap="$4" flex={1} justifyContent="center">
        <XStack justifyContent="flex-start">
          <Text fontSize="$9" fontWeight="600" fontFamily="$rounded">
            My summary
          </Text>
        </XStack>
        <RecentlyReviewedContainer />
        <WeeklyGoalContainer />
        <WeeklyProgressContainer />
        <Link href="/(home)/decks/">Decks</Link>
      </YStack>
    </ScrollView>
  );
}
