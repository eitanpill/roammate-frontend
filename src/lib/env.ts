import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url('API URL must be a valid URL').default('http://localhost:3001'),
  NEXT_PUBLIC_NEXTAUTH_URL: z.string().url('NextAuth URL must be a valid URL').optional(),
  NEXTAUTH_SECRET: z.string().min(1, 'NextAuth secret is required').optional(),
});

type Env = z.infer<typeof envSchema>;

let validatedEnv: Env | null = null;

export function getEnv(): Env {
  if (validatedEnv) {
    return validatedEnv;
  }

  try {
    validatedEnv = envSchema.parse(process.env);
    return validatedEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map((issue) => issue.path.join('.')).join(', ');
      throw new Error(`Missing or invalid environment variables: ${missingVars}`);
    }
    throw error;
  }
}

export const env = getEnv();
