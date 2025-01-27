import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';
import { signInEmailPassword } from "./auth-actions";

class InvalidStatusUser extends CredentialsSignin {
  code = 'Usuario inactivo'
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub, 
    Google,
    Credentials({
      credentials: {
        email: { label: "Usuario", type: "email", placeholder: "usuario@dominio.com" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const user = await signInEmailPassword(credentials.email as string, credentials.password as string);
        
        if (!user) return null;

        return user
      },
    })
  ],

  session: {
    strategy: 'jwt'
  },

  callbacks: {

    async signIn({ user, account }) {
      return true;
    },

    async jwt({ token }) {
      const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } });

      if(dbUser?.isActive === false ) {
        throw new InvalidStatusUser();
      }

      token.roles = dbUser?.roles ?? ['no-roles'];
      token.id    = dbUser?.id ?? 'no-uuid';

      return token;
    },

    async session({ session, token }) {

      if ( session && session.user ) {
        session.user.roles = token.roles as string[];
        session.user.id    = token.id as string;
      }

      return session
    }

  }
})