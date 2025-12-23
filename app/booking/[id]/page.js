
import { services } from "@/lib/data";
import BookingForm from "@/components/BookingForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

export default async function BookingPage({ params }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const { id } = await params;
    const service = services.find((s) => s.id === id);

    if (!service) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                    Complete Your Booking
                </h1>
                <BookingForm service={service} user={session.user} />
            </div>
        </div>
    );
}
