import { ComponentProps } from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { View, YStack, useWindowDimensions } from 'tamagui';

import { Text } from '../../../../components';

type ReviewCardProps = {
  state: 'initial' | 'flipped';
  front: string;
  back: string;
  frontStyle: ComponentProps<typeof Animated.View>['style'];
  backStyle: ComponentProps<typeof Animated.View>['style'];
  onPress: () => void;
};

export function ReviewCard(props: ReviewCardProps) {
  const { front, back, onPress, frontStyle, backStyle } = props;
  const dimensions = useWindowDimensions();

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        {/* FRONT */}
        <Animated.View
          style={[
            styles.front,
            frontStyle,
            { width: dimensions.width * 0.8, height: dimensions.height * 0.35 },
          ]}
        >
          <Text type="title-3">{front}</Text>
        </Animated.View>
        {/* BACK */}
        <Animated.View
          style={[
            styles.back,
            backStyle,
            { width: dimensions.width * 0.8, height: dimensions.height * 0.35 },
          ]}
        >
          <YStack
            flex={1}
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <View
              flex={1}
              width="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Text type="title-3">{front}</Text>
            </View>
            <View width="100%" bg="$gray3" height={2} />
            <View
              flex={1}
              width="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Text type="title-3">{back}</Text>
            </View>
          </YStack>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  front: {
    borderRadius: 16,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    backgroundColor: 'white',
    shadowColor: '$shadowColor',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevationAndroid: 15,
  },
  back: {
    borderRadius: 16,
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '$shadowColor',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevationAndroid: 15,
  },
});
