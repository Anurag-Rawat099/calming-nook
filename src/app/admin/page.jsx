
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const statusStyles = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    totalRevenue: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/admin/dashboard", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Unable to load dashboard data."
          );
        }

        if (active) {
          setDashboard(data.stats);
          setRecentBookings(data.recentBookings || []);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  const stats = [
    {
      title: "Total Bookings",
      value: dashboard.totalBookings,
    },
    {
      title: "Revenue",
      value: formatCurrency(dashboard.totalRevenue),
    },
    {
      title: "Pending Bookings",
      value: dashboard.pendingBookings,
    },
  ];

  return (
    <div className="text-black">
      {/* Heading */}
      <div className="mb-10">
        <p className="uppercase tracking-[6px] text-[var(--primary)] text-sm">
          Dashboard Overview
        </p>

        <h1 className="text-4xl sm:text-5xl font-bold mt-4">
          Welcome Back 👋
        </h1>

        <p className="text-black/50 mt-4">
          Here’s what’s happening at Calming Nook today.
        </p>
      </div>

      {/* Real Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white p-7 rounded-xl border border-black/5 shadow-sm"
          >
            <p className="text-black/50">{item.title}</p>

            <h2 className="text-3xl sm:text-4xl font-bold mt-4 text-[var(--primary)] break-words">
              {loading ? "..." : item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* API Errors */}
      {error && (
        <div
          role="alert"
          className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg"
        >
          <p className="font-semibold">Dashboard could not be loaded</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        {/* Recent Bookings */}
        <div className="xl:col-span-2 bg-white p-5 sm:p-7 border border-black/5 rounded-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-2xl font-bold">Recent Bookings</h3>

            <Link
              href="/admin/bookings"
              className="text-[var(--primary)] font-medium hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="mt-8 space-y-5">
            {loading ? (
              <p className="text-black/50">Loading bookings...</p>
            ) : error ? (
              <p className="text-black/50">
                Booking information is temporarily unavailable.
              </p>
            ) : recentBookings.length === 0 ? (
              <p className="text-black/50 bg-[#faf7f2] p-5">
                No bookings yet. New reservations will appear here.
              </p>
            ) : (
              recentBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#faf7f2] p-5"
                >
                  <div className="min-w-0">
                    <h4 className="font-semibold break-words">
                      {booking.guestName}
                    </h4>

                    <p className="text-sm text-black/50 mt-1">
                      Booking ID: {booking.bookingId}
                    </p>

                    <p className="text-sm text-black/50 mt-1">
                      Check-in: {formatDate(booking.checkIn)}
                    </p>

                    <p className="text-sm text-black/50 mt-1">
                      Check-out: {formatDate(booking.checkOut)}
                    </p>

                    <p className="text-sm font-medium mt-2">
                      {formatCurrency(booking.totalAmount)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                    <span
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        statusStyles[booking.bookingStatus] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {booking.bookingStatus
                        ? booking.bookingStatus.charAt(0).toUpperCase() +
                          booking.bookingStatus.slice(1)
                        : "Unknown"}
                    </span>

                    <span className="text-xs text-black/50">
                      Payment: {booking.paymentStatus || "Unknown"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-7 border border-black/5 rounded-xl">
          <h3 className="text-2xl font-bold">Quick Actions</h3>

          <div className="mt-6 space-y-4">
            {[
              { label: "View Bookings", href: "/admin/bookings" },
              { label: "Manage Payments", href: "/admin/payments" },
              { label: "Upload Images", href: "/admin/gallery" },
              { label: "Website Settings", href: "/admin/setting" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block w-full text-center bg-[var(--primary)] text-white py-4 px-3 font-medium hover:opacity-90 transition-opacity rounded-md"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Sections not yet connected to real data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-7 border border-black/5 rounded-xl">
          <h3 className="text-2xl font-bold">Latest Reviews</h3>

          <p className="text-black/50 mt-4 leading-relaxed">
            Reviews will appear here when a review collection or review
            provider is connected.
          </p>
        </div>

        <div className="bg-white p-7 border border-black/5 rounded-xl">
          <h3 className="text-2xl font-bold">Recent Activity</h3>

          <p className="text-black/50 mt-4 leading-relaxed">
            Activity updates will appear here once dashboard activity
            tracking is implemented.
          </p>
        </div>
      </div>
    </div>
  );
}
