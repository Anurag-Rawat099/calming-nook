"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div
      className="
      min-h-screen
      bg-[#f8f5ef]
      flex
      items-center
      justify-center
      px-4
    "
    >
      {/* Login Card */}

      <div
        className="
        w-full
        max-w-[450px]
        bg-white
        border
        border-black/5
        p-10
      "
      >
        {/* Top */}

        <div className="text-center">
          <p
            className="
            uppercase
            tracking-[6px]
            text-[var(--primary)]
            text-xs
          "
          >
            Calming Nook
          </p>

          <h1
            className="
            text-4xl
            font-bold
            mt-4
          "
          >
            Admin Login
          </h1>

          <p className="text-black/50 mt-4">
            Login to manage your stay website.
          </p>
        </div>

        {/* Form */}

        <div className="mt-10 space-y-6">
          {/* Email */}

          <div>
            <label className="text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="admin@gmail.com"
              className="
              w-full
              mt-3
              border
              border-black/10
              bg-[#faf7f2]
              px-5
              py-4
              outline-none
            "
            />
          </div>

          {/* Password */}

          <div>
            <label className="text-sm font-medium">
              Password
            </label>

            <div className="relative mt-3">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                className="
                w-full
                border
                border-black/10
                bg-[#faf7f2]
                px-5
                py-4
                pr-16
                outline-none
              "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-sm
                text-black/50
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
            <label className="flex items-center gap-3">
              <input type="checkbox" />

              <span className="text-sm">
                Remember Me
              </span>
            </label>

            <button
              className="
              text-sm
              text-[var(--primary)]
            "
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}

          <button
            className="
            w-full
            bg-[var(--primary)]
            text-white
            py-4
            font-medium
            hover:opacity-90
            transition-all
          "
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}