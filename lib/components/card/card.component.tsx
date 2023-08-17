import {
  styled,
  Stack,
  createStyledContext,
  withStaticProperties,
} from 'tamagui';

import { Text } from '../text';

export const CardContext = createStyledContext({});

const CardFrame = styled(Stack, {
  name: 'CardFrame',
  backgroundColor: 'white',
  shadowColor: '$shadowColor',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.1,
  shadowRadius: 18,
  borderRadius: '$5',
  elevationAndroid: 15,
  padding: '$4',
  context: CardContext,
  variants: {
    size: { large: { px: '$4', py: '$3' } },
  } as const,
});

const CardLabel = styled(Text, {
  name: 'CardLabel',
  fontFamily: '$rounded',
  fontWeight: '600',
  fontSize: 18,
  context: CardContext,
  variants: {} as const,
});

export const Card = withStaticProperties(CardFrame, {
  Label: CardLabel,
  Props: CardContext.Provider,
});
