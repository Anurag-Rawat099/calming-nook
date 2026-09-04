"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                "/api/auth/logout",
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (data.success) {
                router.replace("/auth/login");
                router.refresh();
            } else {
                console.error(
                    "Logout failed:",
                    data.message
                );
            }
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="
                flex
                items-center
                gap-3
                px-5
                py-4
                rounded-2xl
                bg-red-50
                text-red-500
                w-full
                hover:bg-red-100
                transition-all
                disabled:opacity-50
                disabled:cursor-not-allowed
            "
        >
            <LogOut size={20} />

            {loading ? "Logging out..." : "Logout"}
        </button>
    );
}