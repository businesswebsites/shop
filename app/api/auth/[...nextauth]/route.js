import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";  
import User from "@/models/User";
import bcrypt from "bcrypt";

export const authOptions = {  
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-Mail", type: "email", placeholder: "max@example.com" },
        password: { label: "Passwort", type: "password" },
      },
      async authorize(credentials, req) {
        await dbConnect(); 
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("Keine Nutzer mit dieser E-Mail gefunden");
        }
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Ungültiges Passwort");
        }
        return { id: user._id.toString(), name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
