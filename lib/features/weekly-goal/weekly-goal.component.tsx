import { eachDayOfInterval, startOfWeek, endOfWeek, format } from 'date-fns';
import { Flame, Check } from 'lucide-react-native';
import { YStack, Text, XStack, View, getToken } from 'tamagui';

export function WeeklyGoal() {
  const now = new Date();
  const weekDays = eachDayOfInterval({
    start: startOfWeek(now),
    end: endOfWeek(now),
  });

  return (
    <YStack
      backgroundColor="white"
      bg="white"
      shadowColor="$shadowColor"
      shadowOffset={{ width: 0, height: 8 }}
      shadowOpacity={0.1}
      shadowRadius={18}
      borderRadius="$5"
      p="$4"
      gap="$4"
    >
      <Text fontFamily="$rounded" fontWeight="600" fontSize={18}>
        Weekly goal
      </Text>

      <XStack justifyContent="space-between">
        {weekDays.map((day) => (
          <WeekDayCheckMark key={day.toDateString()} day={day} />
        ))}
      </XStack>
      <YStack alignSelf="center">
        <LearningStreak streak={2} />
      </YStack>
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
        <Flame size={24} color={getToken('$color.blue10Light')} />
        <Text fontFamily="$rounded" fontSize={16} alignSelf="flex-end">
          {streak}
        </Text>
      </XStack>
      <Text fontFamily="$rounded">Learning streak</Text>
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
      <Text fontFamily="$rounded">{format(day, 'EEE')}</Text>
    </YStack>
  );
}
