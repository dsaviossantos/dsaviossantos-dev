import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser, validatePassword } from "@/app/actions";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const user_data = await getUser(credentials.email);
        if (
          user_data &&
          (await validatePassword(user_data, credentials.password))
        ) {
          return user_data.email;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      console.log(session);
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
