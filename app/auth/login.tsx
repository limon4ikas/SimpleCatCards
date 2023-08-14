import { Button } from 'tamagui';

import { useLoginWithEmailPasswordMutation } from '../../lib/features/auth';

const email = 'limonikas@me.com';
const password = 'xuwi389fa';

export default function Login() {
  const mutation = useLoginWithEmailPasswordMutation();

  return (
    <Button onPress={() => mutation.mutate({ email, password })}>Login</Button>
  );
}
