import { connectDB } from '@/dbConfig/dbConfig';
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { email, password } = reqBody;
		console.log("body",reqBody);

		const user = await User.findOne({ email }).select("+password");
		if(!user) {
			return NextResponse.json(
				{ error: "User not found" }, { status: 400 }
			);
		}	
		
		const validPassword = await bcrypt.compare(password, user.password);
		if(!validPassword) {
			return NextResponse.json(
				{ error: "Invalid password" }, { status: 400 }
			);
		}
		const tokenData = {
			id: user._id,
			username: user.username,
			email: user.email,
		};

		const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
			expiresIn: "1h",
		})	

		const response = NextResponse.json({
			message: "User logged in successfully",
			status: 200,
			success: true,			
		});
		response.cookies.set("token", token, {
			httpOnly: true,
		});		
		return response

	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message }, { status: 500 }
		);
	}
	
}