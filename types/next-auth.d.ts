import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean; // Tipo booleano para emailVerified
  }

  interface Session {
    user: User & {
      id: string;
      emailVerified: boolean | Date; // Mantendo como booleano
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    emailVerified: boolean | Date
  }
}
