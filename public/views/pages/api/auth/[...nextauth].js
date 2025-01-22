import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        // Send a request to your backend API with the user information
        try {
            console.log({from_callbacks:profile});
        } catch (error) {
          console.error("Failed to send user data to API:", error);
        }

        // Add account info to the JWT token
        token.accessToken = account.access_token;
        token.id = profile?.sub;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass token details to the session
      session.user.id = token.id;
      session.user.accessToken = token.accessToken;

      // Optional: Send user session data to another API or log user info
      try {
       console.log({from_session:session.user});
      } catch (error) {
        console.error("Failed to log session:", error);
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
