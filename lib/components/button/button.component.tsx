import { Button as TamaButton, styled } from 'tamagui';

export const Button = styled(TamaButton, {
  name: 'MyButton',
  fontFamily: '$rounded',
  fontWeight: '600',
  fontSize: 16,
  variants: {
    variant: {
      primary: {
        backgroundColor: '$blue10',
        color: 'white',
      },
    },
    withElevationShadow: {
      true: {
        shadowColor: '$shadowColor',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 18,
        borderRadius: '$5',
      },
    },
  } as const,
  defaultVariants: {
    variant: 'primary',
  },
});
