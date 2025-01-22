import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"; 

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: "215910679075-u6usetnuktua89nk586tis0b1p5t9djl.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.sub;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);
