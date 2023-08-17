import { YStack, XStack, ScrollView } from 'tamagui';

import { Text } from '../../components';
import { RecentlyReviewedContainer } from '../recently-reviewed';
import { WeeklyGoalContainer } from '../weekly-goal';
import { WeeklyProgressContainer } from '../weekly-progress';

export function OverviewScreen() {
  return (
    <ScrollView flex={1}>
      <YStack p="$4" gap="$4" flex={1} justifyContent="center">
        <XStack justifyContent="flex-start">
          <Text type="large-title">My summary</Text>
        </XStack>
        <WeeklyGoalContainer />
        <WeeklyProgressContainer />
        <RecentlyReviewedContainer />
      </YStack>
    </ScrollView>
  );
}
