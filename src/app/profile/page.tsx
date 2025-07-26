"use client"
import React from 'react'
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";


export default function Profile() {
	const router = useRouter();
	const onLogout = async () => {
		try {
			const { data: response } = await axios.get("/api/users/logout");
			if (response.success) {
				console.log("logout success", response);
				toast.success("Logout successful");
				router.push("/login");
			}
			
		} catch (error : any) {
			console.log("logout error", error);
			toast.error(error.message);
		}
	}
	return (
		<div className="flex flex-col items-center  gap-3 justify-center min-h-screen">
			<h1>Profile</h1>
			<p>	profile page</p>
			<hr />
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={onLogout}
			>
				Logout
			</button>
		</div>
	);
}