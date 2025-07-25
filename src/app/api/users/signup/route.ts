import { connectDB } from '@/dbConfig/dbConfig';
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";


connectDB();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { username, email, password } = reqBody;
		console.log(reqBody);

		// check if user already exists
		const user = await User.findOne({ email });
		if (user) {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 400 }
			);
		}
		
		const newUser = new User({ username, email, password });
		const salt = await bcrypt.genSalt(10);
		newUser.password = await bcrypt.hash(password, salt);
		await newUser.save();

		return NextResponse.json({
			message: "User registered successfully",
			status: 201,
			success: true,
			newUser
		});

	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}