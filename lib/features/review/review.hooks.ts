import { useMutation } from '@tanstack/react-query';
import { ClientResponseError } from 'pocketbase';
import {
  WithSpringConfig,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import { SuperMemoItem } from 'supermemo';

import { api } from '../../api';
import { FlashcardsResponse } from '../../types';

export function usePractiseCardMutation() {
  return useMutation<
    FlashcardsResponse,
    ClientResponseError,
    { cardId: string; deckId: string; update: SuperMemoItem }
  >({
    mutationFn: api.practiceCard,
  });
}

const SPRING_CONFIG: WithSpringConfig = {};

export function useFlipCardAnimation(isFlipped: boolean) {
  const spin = useDerivedValue(() => (isFlipped ? 1 : 0), [isFlipped]);

  const frontStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [{ rotateY: withSpring(`${spinVal}deg`, SPRING_CONFIG) }],
    };
  }, []);

  const backStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [{ rotateY: withSpring(`${spinVal}deg`, SPRING_CONFIG) }],
    };
  }, []);

  return { frontStyle, backStyle };
}
