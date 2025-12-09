import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from "./db"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import AzureADProvider from "next-auth/providers/azure-ad"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // TODO: Implement actual password hashing comparison
                // This is a placeholder for development
                if (!credentials?.email || !credentials?.password) return null;

                // Allow simplified login for demo
                if (credentials.email === "admin@universe.io" && credentials.password === "admin") {
                    return {
                        id: "admin-id",
                        name: "Commander Shepard",
                        email: "admin@universe.io",
                        role: "ADMIN"
                    } as any
                }

                const user = await db.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user) return null;

                // For now, simple check (INSECURE - for dev only, replace with bcrypt)
                if (user.passwordHash === credentials.password) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    } as any
                }

                return null
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
        }),
        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID!,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
            tenantId: process.env.AZURE_AD_TENANT_ID,
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            // For OAuth providers, check for existing user and handle linking
            if (account?.provider === "google" || account?.provider === "azure-ad") {
                try {
                    const existingUser = await db.user.findUnique({
                        where: { email: user.email! }
                    });

                    if (existingUser) {
                        // User exists - update user.id so session uses existing user
                        user.id = existingUser.id;

                        // Ensure user has a role
                        if (!existingUser.role) {
                            await db.user.update({
                                where: { id: existingUser.id },
                                data: { role: "USER" }
                            });
                        }
                    }
                } catch (error) {
                    console.error("Error in signIn callback:", error);
                }
            }
            return true;
        },
        async jwt({ token, user, account }) {
            // On initial sign in, add user info to token
            if (user) {
                token.id = user.id;
                token.email = user.email;

                // For OAuth users, fetch role from database
                if (account?.provider === "google" || account?.provider === "azure-ad") {
                    const dbUser = await db.user.findUnique({
                        where: { email: user.email! }
                    });
                    token.role = (dbUser?.role || "USER") as "ADMIN" | "USER" | "EDITOR" | "VIEWER";
                } else {
                    // For credentials login, role is already on user object
                    token.role = ((user as any).role || "USER") as "ADMIN" | "USER" | "EDITOR" | "VIEWER";
                }
            }
            return token;
        },
        async session({ session, token }) {
            // Add token info to session
            if (session.user && token) {
                session.user.id = token.id as string;
                session.user.role = token.role as any;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            // If url contains callbackUrl parameter, use it
            if (url.startsWith(baseUrl)) {
                return url;
            }
            // Always redirect to dashboard after login
            return `${baseUrl}/dashboard`;
        }
    },
    pages: {
        signIn: '/login',
    }
}
