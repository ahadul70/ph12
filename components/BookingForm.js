
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { locations } from "@/lib/data";
import { Loader2 } from "lucide-react";

export default function BookingForm({ service, user }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        startDate: "",
        durationDays: 1,
        division: "",
        district: "",
        city: "",
        address: "",
    });

    const [totalCost, setTotalCost] = useState(0);

 
    useEffect(() => {
        if (formData.durationDays > 0) {
            setTotalCost(formData.durationDays * service.pricePerDay);
        }
    }, [formData.durationDays, service.pricePerDay]);

    // Derived state for locations
    const uniqueDivisions = [...new Set(locations.map((item) => item.region))];
    const availableDistricts = locations.filter(
        (item) => item.region === formData.division
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDivisionChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            division: e.target.value,
            district: "", // Reset dependent fields
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const endDate = new Date(formData.startDate);
            endDate.setDate(endDate.getDate() + parseInt(formData.durationDays));

            const res = await fetch("/api/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    serviceId: service.id,
                    serviceName: service.title,
                    startDate: formData.startDate,
                    endDate: endDate.toISOString(),
                    durationDays: parseInt(formData.durationDays),
                    totalCost: totalCost,
                    location: {
                        division: formData.division,
                        district: formData.district,
                        city: formData.city,
                        address: formData.address,
                    },
                }),
            });

            if (res.ok) {
                router.push("/my-bookings");
                router.refresh(); // Refresh to show new booking
            } else {
                const data = await res.json();
                setError(data.message || "Booking failed");
            }
        } catch (error) {
            setError("An error occurred while booking");
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="text-center p-8">
                <p className="text-lg mb-4">You need to log in to book a service.</p>
                <button
                    onClick={() => router.push("/login")}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Book {service.title}
            </h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Date & Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Start Date
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Duration (Days)
                        </label>
                        <input
                            type="number"
                            name="durationDays"
                            value={formData.durationDays}
                            onChange={handleChange}
                            min="1"
                            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                            required
                        />
                    </div>
                </div>

                {/* Location */}
                <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Location Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Division
                            </label>
                            <select
                                name="division"
                                value={formData.division}
                                onChange={handleDivisionChange}
                                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                                <option value="">Select Division</option>
                                {uniqueDivisions.map((div) => (
                                    <option key={div} value={div}>{div}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                District
                            </label>
                            <select
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                required
                                disabled={!formData.division}
                            >
                                <option value="">Select District</option>
                                {availableDistricts.map((item) => (
                                    <option key={item.district} value={item.district}>{item.district}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                City / Upazila
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Full Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="House No, Road No, Area"
                                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Cost Summary */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                    <div className="flex justify-between items-center text-lg font-bold">
                        <span className="text-gray-900 dark:text-white">Total Cost:</span>
                        <span className="text-primary-600 dark:text-primary-400">${totalCost}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                        {formData.durationDays} days x ${service.pricePerDay}/day
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 flex justify-center items-center"
                >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : "Confirm Booking"}
                </button>
            </form>
        </div>
    );
}
