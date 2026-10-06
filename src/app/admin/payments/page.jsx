"use client";

import { useEffect, useState } from "react";
import {
    CreditCard,
    IndianRupee,
    Clock,
    RotateCcw,
} from "lucide-react";

export default function PaymentsPage() {
    const [payments, setPayments] = useState([]);
    const [stats, setStats] = useState({
        totalPayments: 0,
        totalRevenue: 0,
        pendingAmount: 0,
        refundedAmount: 0,
    });

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            setLoading(true);

            const res = await fetch(
                "/api/payments",
                {
                    credentials: "include",
                }
            );

            const data = await res.json();

            if (data.success) {
                setPayments(data.payments);
                setStats(data.stats);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error(
                "Payments fetch error:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (
        id,
        paymentStatus
    ) => {
        try {
            setUpdating(id);

            const res = await fetch(
                `/api/payments/${id}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        paymentStatus,
                    }),
                }
            );

            const data = await res.json();

            if (data.success) {
                fetchPayments();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to update payment.");
        } finally {
            setUpdating(null);
        }
    };

    const formatCurrency = (amount) => {
        return `₹${Number(amount || 0).toLocaleString(
            "en-IN"
        )}`;
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "paid":
                return "bg-green-100 text-green-700";

            case "partially_paid":
                return "bg-yellow-100 text-yellow-700";

            case "refunded":
                return "bg-purple-100 text-purple-700";

            case "failed":
                return "bg-red-100 text-red-700";

            default:
                return "bg-black/5 text-black/60";
        }
    };

    return (
        <div className="space-y-8">

            {/* HEADER */}

            <div>
                <p className="uppercase tracking-[6px] text-[var(--primary)] text-xs">
                    Payment Management
                </p>

                <h1 className="text-4xl font-bold mt-3">
                    Payments
                </h1>

                <p className="text-black/50 mt-3">
                    Track booking payments,
                    revenue and refunds.
                </p>
            </div>

            {/* STATS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                <StatCard
                    icon={<IndianRupee size={20} />}
                    title="Total Revenue"
                    value={formatCurrency(
                        stats.totalRevenue
                    )}
                />

                <StatCard
                    icon={<CreditCard size={20} />}
                    title="Total Payments"
                    value={stats.totalPayments}
                />

                <StatCard
                    icon={<Clock size={20} />}
                    title="Pending Amount"
                    value={formatCurrency(
                        stats.pendingAmount
                    )}
                />

                <StatCard
                    icon={<RotateCcw size={20} />}
                    title="Refunded Amount"
                    value={formatCurrency(
                        stats.refundedAmount
                    )}
                />

            </div>

            {/* TABLE */}

            <div className="bg-white border border-black/5 overflow-hidden">

                <div className="p-6 border-b border-black/5">
                    <h2 className="text-xl font-semibold">
                        Payment Transactions
                    </h2>
                </div>

                {loading ? (
                    <div className="p-12 text-center text-black/50">
                        Loading payments...
                    </div>
                ) : payments.length === 0 ? (
                    <div className="p-16 text-center">

                        <CreditCard
                            size={40}
                            className="mx-auto text-black/20"
                        />

                        <p className="mt-4 text-black/50">
                            No payments found.
                        </p>

                    </div>
                ) : (
                    <div className="overflow-x-auto">

                        <table className="w-full text-sm">

                            <thead className="bg-[#faf7f2]">

                                <tr>

                                    <th className="text-left px-6 py-4 font-medium">
                                        Booking
                                    </th>

                                    <th className="text-left px-6 py-4 font-medium">
                                        Guest
                                    </th>

                                    <th className="text-left px-6 py-4 font-medium">
                                        Amount
                                    </th>

                                    <th className="text-left px-6 py-4 font-medium">
                                        Method
                                    </th>

                                    <th className="text-left px-6 py-4 font-medium">
                                        Status
                                    </th>

                                    <th className="text-left px-6 py-4 font-medium">
                                        Date
                                    </th>

                                    <th className="text-right px-6 py-4 font-medium">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {payments.map(
                                    (payment) => (
                                        <tr
                                            key={
                                                payment._id
                                            }
                                            className="border-t border-black/5"
                                        >

                                            <td className="px-6 py-5">

                                                <p className="font-medium">
                                                    {
                                                        payment.bookingId
                                                    }
                                                </p>

                                            </td>

                                            <td className="px-6 py-5">

                                                <p className="font-medium">
                                                    {
                                                        payment.guestName
                                                    }
                                                </p>

                                                <p className="text-xs text-black/40 mt-1">
                                                    {
                                                        payment.guestEmail
                                                    }
                                                </p>

                                            </td>

                                            <td className="px-6 py-5 font-semibold">
                                                {formatCurrency(
                                                    payment.amount
                                                )}
                                            </td>

                                            <td className="px-6 py-5 capitalize">
                                                {
                                                    payment.paymentMethod
                                                }
                                            </td>

                                            <td className="px-6 py-5">

                                                <span
                                                    className={`px-3 py-1 text-xs rounded-full capitalize ${getStatusClass(
                                                        payment.paymentStatus
                                                    )}`}
                                                >
                                                    {payment.paymentStatus.replace(
                                                        "_",
                                                        " "
                                                    )}
                                                </span>

                                            </td>

                                            <td className="px-6 py-5 text-black/50">

                                                {new Date(
                                                    payment.createdAt
                                                ).toLocaleDateString(
                                                    "en-IN",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    }
                                                )}

                                            </td>

                                            <td className="px-6 py-5">

                                                <div className="flex justify-end gap-2">

                                                    {payment.paymentStatus ===
                                                        "pending" && (
                                                        <button
                                                            disabled={
                                                                updating ===
                                                                payment._id
                                                            }
                                                            onClick={() =>
                                                                updateStatus(
                                                                    payment._id,
                                                                    "paid"
                                                                )
                                                            }
                                                            className="px-3 py-2 text-xs bg-green-50 text-green-600 hover:bg-green-600 hover:text-white disabled:opacity-50"
                                                        >
                                                            Mark Paid
                                                        </button>
                                                    )}

                                                    {payment.paymentStatus ===
                                                        "paid" && (
                                                        <button
                                                            disabled={
                                                                updating ===
                                                                payment._id
                                                            }
                                                            onClick={() =>
                                                                updateStatus(
                                                                    payment._id,
                                                                    "refunded"
                                                                )
                                                            }
                                                            className="px-3 py-2 text-xs bg-red-50 text-red-500 hover:bg-red-500 hover:text-white disabled:opacity-50"
                                                        >
                                                            Refund
                                                        </button>
                                                    )}

                                                </div>

                                            </td>

                                        </tr>
                                    )
                                )}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>

        </div>
    );
}

function StatCard({
    icon,
    title,
    value,
}) {
    return (
        <div className="bg-white border border-black/5 p-6">

            <div className="flex items-center justify-between">

                <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
                    {icon}
                </div>

            </div>

            <p className="text-sm text-black/50 mt-5">
                {title}
            </p>

            <h2 className="text-2xl font-bold mt-2 text-[var(--primary)]">
                {value}
            </h2>

        </div>
    );
}