import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, Stack, Text, View, YStack } from 'tamagui';

import { TextField } from '../../components';
import {
  LoginWithEmailPassword,
  LoginWithEmailPasswordSchema,
} from '../../types/api';

export type LoginFormProps = {
  onSubmit: (values: LoginWithEmailPassword) => void;
  fetchError?: string;
};

export function LoginForm(props: LoginFormProps) {
  const { onSubmit, fetchError } = props;
  const { control, handleSubmit } = useForm<LoginWithEmailPassword>({
    resolver: zodResolver(LoginWithEmailPasswordSchema),
  });

  return (
    <Stack>
      <Text
        fontFamily="$rounded"
        fontSize={28}
        color="$orange10"
        alignSelf="center"
        fontWeight="600"
        mb="$2"
      >
        Login form
      </Text>
      {fetchError ? (
        <Text
          color="$red10"
          fontFamily="$rounded"
          fontWeight="600"
          mb="$2"
          alignSelf="center"
        >
          {fetchError}
        </Text>
      ) : null}
      <YStack gap="$4">
        <TextField
          name="email"
          textContentType="oneTimeCode"
          autoComplete="email"
          placeholder="Email..."
          control={control}
        />
        <TextField
          name="password"
          textContentType="oneTimeCode"
          autoComplete="password"
          secureTextEntry
          placeholder="Password"
          control={control}
        />
        <View>
          <Button
            onPress={handleSubmit(onSubmit)}
            backgroundColor="$blue10"
            color="white"
            fontWeight="600"
            fontFamily="$rounded"
            fontSize={16}
          >
            Login
          </Button>
        </View>
      </YStack>
    </Stack>
  );
}
