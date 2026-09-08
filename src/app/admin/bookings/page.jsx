"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Search,
  CalendarDays,
  IndianRupee,
  Users,
  Eye,
  Trash2,
  Download,
  X,
} from "lucide-react";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Completed: "bg-blue-100 text-blue-700",
};

const paymentColors = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-orange-100 text-orange-700",
  Refunded: "bg-red-100 text-red-700",
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch("/api/bookings", {
        credentials: "include",
        cache: "no-store",
      });

      const contentType = res.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        throw new Error("Bookings API route not found or crashed.");
      }

      const data = await res.json();

      if (res.ok && data.success) {
        setBookings(data.bookings || []);
      } else {
        console.error(data.message);
        setBookings([]);
      }
    } catch (error) {
      console.error("Booking API Error:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  /* ---------------- FILTER BOOKINGS ---------------- */

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch =
        booking.guestName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        booking.phone?.includes(search) ||
        booking.roomType
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  /* ---------------- DASHBOARD STATS ---------------- */

  const stats = useMemo(() => {
    const today = new Date();

    const todayDate = today.toDateString();

    const checkIns = bookings.filter(
      (b) =>
        new Date(b.checkIn).toDateString() === todayDate
    ).length;

    const checkOuts = bookings.filter(
      (b) =>
        new Date(b.checkOut).toDateString() === todayDate
    ).length;

    const pending = bookings.filter(
      (b) => b.status === "Pending"
    ).length;

    const revenue = bookings.reduce(
      (sum, booking) => sum + Number(booking.totalAmount || 0),
      0
    );

    return {
      checkIns,
      checkOuts,
      pending,
      revenue,
    };
  }, [bookings]);

  /* ---------------- UPDATE STATUS ---------------- */

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      fetchBookings();
    } catch (error) {
      console.error(error);
      alert("Unable to update booking.");
    }
  };

  /* ---------------- DELETE ---------------- */

  const deleteBooking = async (id) => {
    const confirmDelete = confirm(
      "Delete this booking permanently?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      fetchBookings();
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  };

  /* ---------------- EXPORT CSV ---------------- */

  const exportBookings = () => {
    const headers = [
      "Guest Name",
      "Phone",
      "Email",
      "Room",
      "Check In",
      "Check Out",
      "Guests",
      "Amount",
      "Status",
      "Payment",
    ];

    const rows = bookings.map((b) => [
      b.guestName,
      b.phone,
      b.email,
      b.roomType,
      new Date(b.checkIn).toLocaleDateString(),
      new Date(b.checkOut).toLocaleDateString(),
      `${b.adults} Adults ${b.children || 0} Children`,
      b.totalAmount,
      b.status,
      b.paymentStatus,
    ]);

    const csv = [headers, ...rows]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "calming-nook-bookings.csv";
    link.click();
  };
  const formatDate = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <div className="space-y-8 bg-[#f8f5ef] min-h-screen">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5">
        <div>
          <p className="uppercase tracking-[6px] text-[var(--primary)] text-xs">
            Booking Management
          </p>

          <h1 className="text-4xl font-bold mt-3">
            All Bookings
          </h1>
        </div>

        <button
          onClick={exportBookings}
          className="bg-[var(--primary)] text-white px-5 py-3 flex items-center gap-2 w-fit"
        >
          <Download size={18} />
          Export Bookings
        </button>
      </div>

      {/* SEARCH & FILTER */}

      <div className="bg-white border border-black/5 p-5 grid md:grid-cols-[1fr_220px] gap-4">

        <div className="relative">
          <Search className="absolute left-4 top-3 text-black/40" size={18} />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search guest, phone or room..."
            className="w-full bg-[#faf7f2] border border-black/10 pl-11 py-3 pr-4 outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#faf7f2] border border-black/10 px-5 py-3 outline-none"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">

        <StatCard
          title="Today's Check-ins"
          value={stats.checkIns}
          icon={<CalendarDays size={24} />}
        />

        <StatCard
          title="Today's Check-outs"
          value={stats.checkOuts}
          icon={<CalendarDays size={24} />}
        />

        <StatCard
          title="Pending Bookings"
          value={stats.pending}
          icon={<Users size={24} />}
        />

        <StatCard
          title="Monthly Revenue"
          value={`₹${stats.revenue.toLocaleString("en-IN")}`}
          icon={<IndianRupee size={24} />}
        />
      </div>

      {/* BOOKINGS LIST */}

      {loading ? (
        <div className="bg-white p-10 text-center">
          Loading bookings...
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white border border-dashed border-black/10 p-16 text-center">
          <CalendarDays size={42} className="mx-auto text-black/30" />

          <p className="mt-4 text-black/50">
            No bookings found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white border border-black/5 p-5 flex flex-col xl:flex-row justify-between gap-6"
            >

              {/* LEFT */}

              <div className="space-y-4 flex-1">

                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-semibold">
                    {booking.guestName || "Guest Name"}
                  </h2>

                  <span
                    className={`text-xs px-3 py-1 ${statusColors[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <p className="text-black/50 text-sm">
                  {booking.roomType || "Room Type"}

                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-sm">

                  <Info title="Check In" value={formatDate(booking.checkIn)} />

                  <Info title="Check Out" value={formatDate(booking.checkOut)} />

                  <Info title="Guests" value={`${booking.adults} Adults`} />

                  <Info title="Phone" value={booking.phone} />

                </div>
              </div>

              {/* RIGHT */}

              <div className="xl:w-[260px] space-y-4">

                <div>
                  <h3 className="text-3xl font-bold text-[var(--primary)]">
                    ₹{Number(booking.totalAmount || 0).toLocaleString("en-IN")}
                  </h3>

                  <p className="text-xs text-black/50 mt-1">
                    Total Amount
                  </p>
                </div>

                <span
                  className={`inline-block text-xs px-3 py-1 ${paymentColors[booking.paymentStatus] ||
                    "bg-gray-100 text-gray-700"
                    }`}
                >
                  {booking.paymentStatus || "Pending"}
                </span>

                <span
                  className={`text-xs px-3 py-1 ${statusColors[booking.status] ||
                    "bg-gray-100 text-gray-700"
                    }`}
                >
                  {booking.status || "Pending"}
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="border border-black/10 py-2 text-sm flex justify-center items-center gap-2 hover:bg-black hover:text-white transition"
                  >
                    <Eye size={16} />
                    View
                  </button>

                  <button
                    onClick={() => deleteBooking(booking._id)}
                    className="border border-red-200 text-red-500 py-2 text-sm flex justify-center items-center gap-2 hover:bg-red-500 hover:text-white transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW MODAL */}

      {selectedBooking && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl p-8 relative overflow-y-auto max-h-[90vh]">

            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute right-5 top-5"
            >
              <X />
            </button>

            <p className="uppercase tracking-[4px] text-xs text-[var(--primary)]">
              Booking Details
            </p>

            <h2 className="text-3xl font-bold mt-2 mb-6">
              {selectedBooking.guestName}
            </h2>

            <div className="grid md:grid-cols-2 gap-5 text-sm">
              <Detail label="Guest Name" value={selectedBooking.guestName} />
              <Detail label="Phone" value={selectedBooking.phone} />
              <Detail label="Email" value={selectedBooking.email} />
              <Detail label="Room" value={selectedBooking.roomType} />
              <Detail label="Check In" value={formatDate(selectedBooking.checkIn)} />
              <Detail label="Check Out" value={formatDate(selectedBooking.checkOut)} />
              <Detail
                label="Guests"
                value={`${selectedBooking.adults} Adults • ${selectedBooking.children} Children`}
              />
              <Detail
                label="Total Amount"
                value={`₹${Number(selectedBooking.totalAmount || 0).toLocaleString("en-IN")}`}
              />
            </div>

            <div className="mt-6">
              <p className="text-xs text-black/40">Special Request</p>
              <p className="mt-2 text-sm leading-7 text-black/70">
                {selectedBooking.specialRequest || "No special request provided."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white border border-black/5 p-5">
      <div className="flex justify-between items-center text-black/40">
        {icon}
      </div>

      <p className="text-sm text-black/50 mt-5">{title}</p>

      <h2 className="text-3xl font-bold text-[var(--primary)] mt-2">
        {value}
      </h2>
    </div>
  );
}

function Info({ title, value }) {
  return (
    <div>
      <p className="text-xs text-black/40">{title}</p>
      <p className="font-medium mt-1">{value}</p>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="bg-[#faf7f2] p-4">
      <p className="text-xs text-black/40">{label}</p>
      <p className="font-medium mt-2">{value}</p>
    </div>
  );
}