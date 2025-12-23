
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Booking from "@/lib/models/Booking";

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

        await dbConnect();

        const newBooking = await Booking.create({
            userId: session.user.id,
            serviceId,
            serviceName,
            startDate,
            endDate,
            durationDays,
            totalCost,
            location,
            status: "Pending",
        });

        // TODO: Send Email Invoice here (Mock)
        console.log("Sending email to:", session.user.email);

        return NextResponse.json(
            { message: "Booking created successfully", booking: newBooking },
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

        await dbConnect();

        // Fetch bookings for the logged-in user
        const bookings = await Booking.find({ userId: session.user.id }).sort({
            createdAt: -1,
        });

        return Response.json({ bookings }, { status: 200 });
    } catch (error) {
        console.error("Fetch Booking Error:", error);
        return Response.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
