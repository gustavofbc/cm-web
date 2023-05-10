import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { getSession } from "next-auth/react";
import { UserCredentialsError } from "@/exceptions/user-credentials-error";
import { SomethingWentWrongError } from "@/exceptions/something-went-wrong-error";

export default NextAuth({
  secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any) {
        try {
          const { data } = await axios.post(`https://hades-auth.onrender.com/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });
          const user: User = data.user;
          const token: string = data.token;

          return {
            ...user,
            token,
          };
        } catch (error: any) {
          if (error.response?.status === 401) {
            throw new UserCredentialsError();
          }
          throw new SomethingWentWrongError();
        }
      },
    }),
  ],

  pages: {
    signIn: "/",
    signOut: "/login",
    // error: "/login",
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account) {
        if (account.provider === "credentials") {
          return true;
        }
      }

      return false;
    },
    async redirect({ url, baseUrl }) {
      return url === "/login" ? baseUrl + url : baseUrl;
    },

    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (user) {
        token.accessToken = user.token;
        token.user = user;
      }
      return token;
    },
    async session({ session, user, token }: any) {
      if (token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});
