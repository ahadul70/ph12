import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { name, email, password, nid, contact } = await req.json();

        if (!name || !email || !password || !nid || !contact) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const users = await getCollection("users");

        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await users.insertOne({
            name,
            email,
            password: hashedPassword,
            nid,
            contact,
            createdAt: new Date(),
        });

        return NextResponse.json(
            { message: "User created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
