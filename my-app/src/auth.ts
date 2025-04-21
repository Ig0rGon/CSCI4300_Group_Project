import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./app/models/userSchema";
import connectMongoDB from "../config/mongodb";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Partial<Record<"email" | "password", unknown>>,
        req: Request
      ): Promise<{ id: string; email: string; name: string } | null> {
        // Validate input types
        if (
          !credentials.email ||
          typeof credentials.email !== "string" ||
          !credentials.password ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }

        try {
          await connectMongoDB();

          const user = await User.findOne({ email: credentials.email }).lean();
          if (!user) {
            console.log("User not found");
            return null;
          }

          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isMatch) {
            console.log("Invalid password");
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.username,
          };
        } catch (error: any) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
});
