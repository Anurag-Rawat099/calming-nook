import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function proxy(request) {
    const { pathname } = request.nextUrl;

    const token = request.cookies.get("token")?.value;

    // Protect /admin and everything inside it
    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
        if (!token) {
            return NextResponse.redirect(
                new URL("/auth/login", request.url)
            );
        }

        const decoded = await verifyToken(token);

        if (!decoded) {
            const response = NextResponse.redirect(
                new URL("/auth/login", request.url)
            );

            response.cookies.delete("token");

            return response;
        }

        return NextResponse.next();
    }

    // Already logged in → don't allow login page
    if (pathname === "/auth/login" && token) {
        const decoded = await verifyToken(token);

        if (decoded) {
            return NextResponse.redirect(
                new URL("/admin", request.url)
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin",
        "/admin/:path*",
        "/auth/login",
    ],
};