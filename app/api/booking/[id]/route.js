import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function PATCH(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;
        const bookings = await getCollection("bookings");

        // Verify the booking exists and belongs to the user
        const booking = await bookings.findOne({
            _id: new ObjectId(id),
            userId: session.user.id
        });

        if (!booking) {
            return NextResponse.json({ message: "Booking not found" }, { status: 404 });
        }

        // Only allow cancelling if status is Pending
        if (booking.status !== "Pending") {
            return NextResponse.json({ message: "Cannot cancel a booking that is not pending" }, { status: 400 });
        }

        const updateResult = await bookings.updateOne(
            { _id: new ObjectId(id) },
            { $set: { status: "Cancelled" } }
        );

        if (updateResult.modifiedCount === 0) {
            return NextResponse.json({ message: "Failed to cancel booking" }, { status: 500 });
        }

        return NextResponse.json({ message: "Booking cancelled successfully" }, { status: 200 });

    } catch (error) {
        console.error("Cancel Booking Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
