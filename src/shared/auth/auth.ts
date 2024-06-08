import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import prisma from "./prisma";
import GitHub from "next-auth/providers/github";
import Yandex from "next-auth/providers/yandex";
import Discord from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts";


import {DefaultSession} from "@auth/core/types";
declare module "next-auth" {
    interface Session {
      user: User & DefaultSession["user"];
    }
  interface User {
    role: String | null;
  }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    session: async ({ session, token }) => {
      if (session.user) {
        const user = await prisma.user.findFirst({
          where: { id: token.sub || "" },
          select: { role: true },
        })
        session.user.role = user?.role || null
        session.user.id = token.sub || "";
      }
      return session;
    },
  },
  providers: [
    GitHub,
    Yandex,
    Discord,
    Credentials({
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        const { email, password } = credentials;

        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (user && user.passwordHash) {
          try {
            if (compareSync(password as string, user.passwordHash)) {
              return user;
            }
          } catch (error) {
            console.error('Error comparing passwords:', error);
            return null;
          }
        }
        return null;
      },
    }),
  ],
});
