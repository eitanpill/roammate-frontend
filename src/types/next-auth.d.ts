import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      id?: string;
      role?: string;
      accessToken?: string;
    } & DefaultSession['user'];
  }
  interface User {
    role?: string;
    accessToken?: string;
    id?: string;
  }
}
