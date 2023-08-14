import { z } from 'zod';

export const LoginWithEmailPasswordSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginWithEmailPassword = z.infer<
  typeof LoginWithEmailPasswordSchema
>;

export const RegisterWithEmailPasswordSchema = z.object({
  email: z.string(),
  password: z.string(),
  passwordConfirm: z.string(),
});

export type RegisterWithEmailPassword = z.infer<
  typeof RegisterWithEmailPasswordSchema
>;
