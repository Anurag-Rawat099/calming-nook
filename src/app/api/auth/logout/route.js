export async function POST() {
    try {
        const response = Response.json({
            success: true,
            message: "Logout successful.",
        });

        response.headers.set(
            "Set-Cookie",
            [
                "token=",
                "HttpOnly",
                "Path=/",
                "Max-Age=0",
                "SameSite=Strict",
                process.env.NODE_ENV === "production"
                    ? "Secure"
                    : "",
            ]
                .filter(Boolean)
                .join("; ")
        );

        return response;
    } catch (error) {
        console.error("Logout error:", error);

        return Response.json(
            {
                success: false,
                message: "Logout failed.",
            },
            { status: 500 }
        );
    }
}