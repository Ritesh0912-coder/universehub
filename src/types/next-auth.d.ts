import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            role: "ADMIN" | "EDITOR" | "VIEWER" | "USER"
        } & DefaultSession["user"]
    }

    interface User {
        role: "ADMIN" | "EDITOR" | "VIEWER" | "USER"
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        role: "ADMIN" | "EDITOR" | "VIEWER" | "USER"
    }
}
