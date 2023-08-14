import { ComponentProps } from 'react';
import { Input, YStack, styled } from 'tamagui';

const StyledInput = styled(Input, {
  name: 'StyledInput',
  fontFamily: '$rounded',
});

export type TextInputProps = ComponentProps<typeof StyledInput> & {
  error?: string;
};

export function TextInput(props: TextInputProps) {
  return (
    <YStack>
      <StyledInput {...props} />;
    </YStack>
  );
}
