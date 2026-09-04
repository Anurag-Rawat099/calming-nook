"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message || "Invalid email or password."
                );
                return;
            }

            if (data.success) {
                router.replace("/admin");
            } else {
                setError(
                    data.message || "Login failed."
                );
            }
        } catch (error) {
            console.error("Login error:", error);

            setError(
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f5ef] flex items-center justify-center px-4">
            <div className="w-full max-w-[450px] bg-white border border-black/5 p-10">

                {/* Header */}

                <div className="text-center">
                    <p className="uppercase tracking-[6px] text-[var(--primary)] text-xs">
                        Calming Nook
                    </p>

                    <h1 className="text-4xl font-bold mt-4">
                        Admin Login
                    </h1>

                    <p className="text-black/50 mt-4">
                        Login to manage your stay website.
                    </p>
                </div>

                {/* Login Form */}

                <form
                    onSubmit={handleLogin}
                    className="mt-10 space-y-6"
                >
                    {/* Error */}

                    {error && (
                        <div className="border border-red-200 bg-red-50 text-red-600 px-4 py-3 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Email */}

                    <div>
                        <label
                            htmlFor="email"
                            className="text-sm font-medium"
                        >
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="admin@calmingnook.com"
                            autoComplete="email"
                            className="
                                w-full
                                mt-3
                                border
                                border-black/10
                                bg-[#faf7f2]
                                px-5
                                py-4
                                outline-none
                                focus:border-[var(--primary)]
                            "
                        />
                    </div>

                    {/* Password */}

                    <div>
                        <label
                            htmlFor="password"
                            className="text-sm font-medium"
                        >
                            Password
                        </label>

                        <div className="relative mt-3">
                            <input
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter password"
                                autoComplete="current-password"
                                className="
                                    w-full
                                    border
                                    border-black/10
                                    bg-[#faf7f2]
                                    px-5
                                    py-4
                                    pr-16
                                    outline-none
                                    focus:border-[var(--primary)]
                                "
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        (prev) => !prev
                                    )
                                }
                                className="
                                    absolute
                                    right-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-sm
                                    text-black/50
                                    hover:text-black
                                "
                            >
                                {showPassword
                                    ? "Hide"
                                    : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Remember */}

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) =>
                                    setRememberMe(
                                        e.target.checked
                                    )
                                }
                            />

                            <span className="text-sm">
                                Remember Me
                            </span>
                        </label>

                        <button
                            type="button"
                            className="
                                text-sm
                                text-[var(--primary)]
                                hover:underline
                            "
                            onClick={() => {
                                setError(
                                    "Please contact the administrator to reset your password."
                                );
                            }}
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {/* Login Button */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            bg-[var(--primary)]
                            text-white
                            py-4
                            font-medium
                            hover:opacity-90
                            transition-all
                            disabled:opacity-60
                            disabled:cursor-not-allowed
                        "
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}