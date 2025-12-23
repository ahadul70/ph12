import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCollection } from "@/lib/db";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const {
            serviceId,
            serviceName,
            startDate,
            endDate,
            durationDays,
            totalCost,
            location,
        } = await req.json();

        const bookings = await getCollection("bookings");

        const newBooking = {
            userId: session.user.id,
            serviceId,
            serviceName,
            startDate,
            endDate,
            durationDays,
            totalCost,
            location,
            status: "Pending",
            createdAt: new Date(),
        };

        const result = await bookings.insertOne(newBooking);

        // TODO: Send Email Invoice here (Mock)
        console.log("Sending email to:", session.user.email);

        return NextResponse.json(
            { message: "Booking created successfully", booking: { ...newBooking, _id: result.insertedId } },
            { status: 201 }
        );
    } catch (error) {
        console.error("Booking Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

        const bookingsCollection = await getCollection("bookings");

        // Fetch bookings for the logged-in user
        const bookings = await bookingsCollection.find({ userId: session.user.id }).sort({
            createdAt: -1,
        }).toArray();

        return Response.json({ bookings }, { status: 200 });
    } catch (error) {
        console.error("Fetch Booking Error:", error);
        return Response.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
