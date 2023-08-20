import { TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { getTokens, XStack, View } from 'tamagui';

import { Text } from '../../../../components';
import { BottomBarState, Grade } from '../../review.types';

type GradeChoiceProps = {
  state: BottomBarState;
  onGradeChoice: (grade: Grade) => void;
  onFlipPress: () => void;
};

export function GradeChoice({
  state,
  onGradeChoice,
  onFlipPress,
}: GradeChoiceProps) {
  const GRADE_CHOICES: Grade[] = [
    { label: 'Fail', grade: 1, color: getTokens().color.red10Light.val },
    { label: 'Hard', grade: 2, color: getTokens().color.yellow10Light.val },
    { label: 'Good', grade: 3, color: getTokens().color.blue10Light.val },
    { label: 'Easy', grade: 4, color: getTokens().color.green10Light.val },
  ];

  if (state === 'hidden') return null;

  return (
    <XStack
      borderTopWidth={1}
      borderTopColor="$gray3"
      px="$4"
      py="$2"
      justifyContent="space-evenly"
      alignItems="center"
      height={55}
    >
      {state === 'grade-visible' ? (
        GRADE_CHOICES.map((grade) => (
          <Animated.View key={grade.grade} entering={FadeIn} exiting={FadeOut}>
            <View
              px="$2"
              bg={grade.color}
              borderRadius="$3"
              py="$2"
              paddingHorizontal="$4"
            >
              <TouchableOpacity onPress={() => onGradeChoice(grade)}>
                <Text type="title-3" color="white">
                  {grade.label}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ))
      ) : state === 'flip-visible' ? (
        <Animated.View entering={FadeIn.delay(200)} exiting={FadeOut}>
          <TouchableOpacity onPress={onFlipPress}>
            <Text type="headline" color="$blue9">
              FLIP
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ) : null}
    </XStack>
  );
}
