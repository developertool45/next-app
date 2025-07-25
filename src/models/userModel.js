import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		select: false,
		minLength:[4, "Password must be at least 8 characters long"],
	},
	username: {
		type: String,
		required: true,
		minLength:[3, "Username must be at least 3 characters long"],
		maxLength:[12, "Username must be at most 12 characters long"],
		unique: true,
		lowercase: true,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	verificationToken: {
		type: String,
		default: "",
	},
	verificationTokenExpiry: {
		type: Date,
		default: null,
	},
	forgotPasswordToken: {
		type: String,
		default: "",
	},
	forgotPasswordTokenExpiry: {
		type: Date,
		default: null,
	},

});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;