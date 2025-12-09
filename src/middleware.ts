import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // Only check role for admin routes
        if (
            req.nextUrl.pathname.startsWith("/admin") &&
            req.nextauth.token?.role !== "ADMIN" &&
            req.nextauth.token?.role !== "EDITOR"
        ) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    },
    {
        callbacks: {
            // With database sessions, we need to be more permissive
            // The actual auth check happens in the page components
            authorized: ({ token, req }) => {
                // Allow access to non-admin routes
                if (!req.nextUrl.pathname.startsWith("/admin")) {
                    return true;
                }
                // For admin routes, check token
                return !!token;
            },
        },
    }
);

export const config = {
    matcher: ["/admin/:path*"],
};
