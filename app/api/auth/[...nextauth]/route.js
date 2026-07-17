// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "@/models/User";

// Connect to MongoDB
async function connectDB() {
  await clientPromise();
}

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: 'kanqoo'
  }),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        await connectDB();

        // Find user
        const user = await User.findOne({ email: credentials.email.toLowerCase() });

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        // Check if account is active
        if (!user.isActive) {
          throw new Error("Account has been deactivated");
        }
        // Require email verification before login
        if (!user.emailVerified) {
          throw new Error("Please verify your email before logging in");
        }
        // Publisher accounts must be approved by an admin before login
        if (user.role === 'publisher' && user.status !== 'approved') {
          throw new Error("Your account is pending approval by an admin");
        }

        // Verify password
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) {
          throw new Error("Invalid email or password");
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Return the full user object to be used in session callbacks
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.fullName,
          handlerName: user.handlerName,
          userType: user.userType,
          emailVerified: user.emailVerified, // This will be true or false
          role: user.role || 'publisher',
          allowedAdminSections: Array.isArray(user.allowedAdminSections) ? user.allowedAdminSections : [],
        };
      }
    }),

  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // This is where we pass the user data to the token
      if (user) {
        token.id = user.id;
        token.handlerName = user.handlerName;
        token.userType = user.userType;
        token.emailVerified = user.emailVerified;
        token.role = user.role || 'publisher';
        token.allowedAdminSections = Array.isArray(user.allowedAdminSections) ? user.allowedAdminSections : [];
      }
      return token;
    },
    async session({ session, token }) {
      // This is where we pass the token data to the client-side session
      if (token) {
        session.user.id = token.id;
        session.user.handlerName = token.handlerName;
        session.user.userType = token.userType;
        session.user.emailVerified = token.emailVerified;
        session.user.role = token.role || 'publisher';
        session.user.allowedAdminSections = Array.isArray(token.allowedAdminSections) ? token.allowedAdminSections : [];
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login', // Redirect to login on error
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
