import { eachDayOfInterval, startOfWeek, endOfWeek, format } from 'date-fns';
import { Flame, Check } from 'lucide-react-native';
import { YStack, XStack, View, getToken } from 'tamagui';

import { Card, Text } from '../../components';
import { getCurrentWeekdays } from '../../utils';

export function WeeklyGoal() {
  const weekDays = getCurrentWeekdays();

  return (
    <Card gap="$4" size="large">
      <Text type="title-2">Weekly goal</Text>
      <XStack justifyContent="space-between">
        {weekDays.map((day) => (
          <WeekDayCheckMark key={day.toDateString()} day={day} />
        ))}
      </XStack>
      <YStack alignSelf="center">
        <LearningStreak streak={2} />
      </YStack>
    </Card>
  );
}

type LearningStreakProps = {
  streak: number;
};

function LearningStreak({ streak }: LearningStreakProps) {
  return (
    <YStack gap="$2">
      <XStack gap="$1" alignItems="center" justifyContent="center">
        <Flame size={22} color={getToken('$color.blue10Light')} />
        <Text type="subhead" alignSelf="flex-end">
          {streak}
        </Text>
      </XStack>
      <Text type="subhead">Learning streak</Text>
    </YStack>
  );
}

type WeekDayCheckMarkProps = {
  day: Date;
};

function WeekDayCheckMark(props: WeekDayCheckMarkProps) {
  const { day } = props;

  return (
    <YStack key={day.toISOString()} gap="$2" alignItems="center">
      <View
        bg="$blue10"
        width={32}
        height={32}
        borderRadius="$12"
        alignItems="center"
        justifyContent="center"
      >
        <Check size={20} color="white" />
      </View>
      <Text type="footnote">{format(day, 'EEE')}</Text>
    </YStack>
  );
}
