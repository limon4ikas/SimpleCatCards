import { Button, Text, YStack } from 'tamagui';

import { useRegisterWithEmailPasswordMutation } from '../../lib/features/auth';

const email = 'limonikas@me.com';
const password = 'xuwi389fa';

export default function Login() {
  const mutation = useRegisterWithEmailPasswordMutation();

  return (
    <YStack>
      {mutation.error ? <Text>{mutation.error.message}</Text> : null}
      <Button
        onPress={() =>
          mutation.mutate({ email, password, passwordConfirm: password })
        }
      >
        Register
      </Button>
    </YStack>
  );
}
