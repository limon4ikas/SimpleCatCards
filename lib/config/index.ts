import { z } from 'zod';

const EnvSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().nonempty(),
  EXPO_PUBLIC_REDIRECT_URL: z.string().url().nonempty(),
});

export const config = EnvSchema.parse(process.env);

console.log(JSON.stringify(config, null, 2));
