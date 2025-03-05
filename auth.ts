import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findUserByCredentials } from "@/lib/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
    async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
    
        const user = await findUserByCredentials(email, password);
        if (!user) return null;

        return { ...user };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});