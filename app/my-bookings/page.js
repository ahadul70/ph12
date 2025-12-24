
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function MyBookingsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }

        if (status === "authenticated") {
            fetchBookings();
        }
    }, [status, router]);

    const fetchBookings = async () => {
        try {
            const res = await fetch("/api/booking");
            if (res.ok) {
                const data = await res.json();
                setBookings(data.bookings);
            }
        } catch (error) {
            console.error("Failed to fetch bookings", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (bookingId) => {
        if (!confirm("Are you sure you want to cancel this booking?")) return;

        try {
            const res = await fetch(`/api/booking/${bookingId}`, {
                method: "PATCH",
            });

            if (res.ok) {
                // Update the local state to reflect the change
                setBookings((prev) =>
                    prev.map((b) =>
                        b._id === bookingId ? { ...b, status: "Cancelled" } : b
                    )
                );
            } else {
                alert("Failed to cancel booking");
            }
        } catch (error) {
            console.error("Error cancelling booking:", error);
            alert("Something went wrong");
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Bookings</h1>

                {bookings.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">No bookings found.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-blue-600">
                                <div className="flex flex-col md:flex-row justify-between md:items-center">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{booking.serviceName}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Booking ID: <span className="font-mono">{booking._id}</span>
                                        </p>
                                        <div className="mt-2 space-y-1">
                                            <p className="text-gray-700 dark:text-gray-300">
                                                <span className="font-semibold">Date:</span> {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                            </p>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                <span className="font-semibold">Duration:</span> {booking.durationDays} Days
                                            </p>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                <span className="font-semibold">Location:</span> {booking.location.address}, {booking.location.city}, {booking.location.division}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 md:mt-0 text-right">
                                        <p className="text-2xl font-bold text-primary-600 mb-2">${booking.totalCost}</p>
                                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium
                      ${booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                                    booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {booking.status}
                                        </span>
                                        {booking.status === 'Pending' && (
                                            <div className="mt-2 flex gap-4">
                                                <Link
                                                    href={`/service/${booking.serviceId}`}
                                                    className="text-blue-600 text-sm hover:underline"
                                                >
                                                    View Details
                                                </Link>
                                                <div className="">
                                                    <button
                                                        onClick={() => handleCancel(booking._id)}
                                                        className="text-red-500 text-sm hover:underline"
                                                    >
                                                        Cancel Booking
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
