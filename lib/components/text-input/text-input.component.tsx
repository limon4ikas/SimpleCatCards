import { ComponentProps } from 'react';
import { Input, styled, Text, YStack } from 'tamagui';

const StyledInput = styled(Input, {
  name: 'StyledInput',
  fontFamily: '$rounded',
  borderRadius: '$5',
  backgroundColor: '$gray3',
  placeholderTextColor: '$gray10',
  fontWeight: '600',
  fontSize: 17,
  borderWidth: 0,
});

export type TextInputProps = ComponentProps<typeof StyledInput> & {
  error?: string;
};

export function TextInput(props: TextInputProps) {
  const { error } = props;
  return (
    <YStack>
      <StyledInput {...props} />
      {error ? (
        <Text
          marginTop="$2"
          color="$red10"
          fontFamily="$rounded"
          fontWeight="400"
        >
          {error}
        </Text>
      ) : null}
    </YStack>
  );
}
