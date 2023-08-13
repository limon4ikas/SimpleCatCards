import { z } from 'zod';

const EnvSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().nonempty(),
});

function getConfig() {
  return EnvSchema.parse(process.env);
}

export const config = getConfig();
