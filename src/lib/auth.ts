import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axiosInstance from './axios';

// Built-in demo accounts so the app is fully usable without a backend.
// All three share the same password. Replace with real backend auth later.
const DEMO_PASSWORD = 'demo1234';
const DEMO_USERS: Record<
  string,
  { id: string; name: string; role: 'guest' | 'host' | 'admin' }
> = {
  'guest@roammate.com': { id: 'demo-guest', name: 'Guest Demo', role: 'guest' },
  'host@roammate.com': { id: 'demo-host', name: 'Host Demo', role: 'host' },
  'admin@roammate.com': { id: 'demo-admin', name: 'Admin Demo', role: 'admin' },
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password;

        // 1) Demo accounts — work with no backend.
        if (email && DEMO_USERS[email] && password === DEMO_PASSWORD) {
          const demo = DEMO_USERS[email];
          return {
            id: demo.id,
            email,
            name: demo.name,
            role: demo.role,
            accessToken: `demo-token-${demo.id}`,
          };
        }

        // 2) Real backend (used automatically once an API is connected).
        try {
          const response = await axiosInstance.post('/api/auth/login', {
            email: credentials?.email,
            password: credentials?.password,
          });

          const { user, token } = response.data;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            accessToken: token,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  secret:
    process.env.NEXTAUTH_SECRET ||
    'roammate-demo-secret-change-me-in-production',
};
