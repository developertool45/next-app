"use client";
import React, { useEffect } from 'react'
import axios from 'axios';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const onLogin = async () => {
        try {
            setButtonDisabled(true);
            setLoading(true);
            const {data: response} = await axios.post("/api/users/login", user);
            if (response.success) {
                console.log("login success",response);
                return router.push("/profile");
            }
            
        } catch(error : any) {
            console.log("login error", error);
            toast.error(error.message);
        }finally {
            setLoading(false);
            setButtonDisabled(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    })
    return (
       <div className="w-full h-screen flex flex-col gap-4 justify-center items-center ">
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />          
            <label htmlFor="email">Email</label>
            <input type="text"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder='email'
                name='email'
                className="input px-4 py-2 border border-gray-300 outline-none focus:border-blue-500 me-4"
             />
            <label htmlFor="password">Password</label>
            <input type="text"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder='password'
                name='password'
                className="input px-4 py-2 border border-gray-300 outline-none focus:border-blue-500 me-4"
            />
            <button onClick={onLogin}
            disabled={buttonDisabled}               
            className='px-4 py-2 border border-gray-300 outline-none focus:border-blue-500 me-4 '
            >{loading ?  "processing" : "Login"}</button>
           <Link href="/signup">Don&apos;t have an account? Signup</Link>
        </div>
    );
}