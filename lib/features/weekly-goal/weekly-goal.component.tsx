import { format } from 'date-fns';
import { YStack, XStack, View, getTokens } from 'tamagui';

import { Card, Text, Icon } from '../../components';
import { getCurrentWeekdays } from '../../utils';

export function WeeklyGoal() {
  const weekDays = getCurrentWeekdays();

  return (
    <Card gap="$4" size="large">
      <Text type="title-2">Weekly goal</Text>
      <XStack justifyContent="space-between">
        {weekDays.map((day) => (
          <WeekDayCheckMark
            key={day.toDateString()}
            day={day}
            isChecked={Math.random() > 0.5}
          />
        ))}
      </XStack>
      <YStack alignSelf="center">
        <LearningStreak streak={2} />
      </YStack>
    </Card>
  );
}

type WeekDayCheckMarkProps = {
  day: Date;
  isChecked?: boolean;
};

function WeekDayCheckMark(props: WeekDayCheckMarkProps) {
  const { day, isChecked } = props;

  return (
    <YStack key={day.toISOString()} gap="$2" alignItems="center">
      <View
        bg={isChecked ? '$green8' : '$colorTransparent'}
        borderColor="$gray4"
        borderWidth={isChecked ? 0 : 4}
        width={32}
        height={32}
        borderRadius="$12"
        alignItems="center"
        justifyContent="center"
      >
        <Icon name="Check" size={20} color="white" />
      </View>
      <Text type="footnote">{format(day, 'EEE')}</Text>
    </YStack>
  );
}

type LearningStreakProps = {
  streak: number;
};

function LearningStreak({ streak }: LearningStreakProps) {
  return (
    <YStack gap="$2">
      <XStack gap="$1" alignItems="center" justifyContent="center">
        <Icon
          name="Flame"
          size={22}
          color={getTokens().color.$orange10Light.val}
        />
        <Text type="subhead" alignSelf="flex-end">
          {streak} streak
        </Text>
      </XStack>
    </YStack>
  );
}
