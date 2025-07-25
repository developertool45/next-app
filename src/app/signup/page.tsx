"use client";
import React, { useEffect } from 'react'
import axios from 'axios';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Signup() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: "",
    }); 
    const [buttonDisabled, setButtonDisabled] = React.useState(false);


    const onSingup = async () => {
        try {
        setLoading(true);
         const {data: response} = await axios.post("/api/users/signup", user);
            if (response.success) {
                console.log(Response);
                return router.push("/login");
            }  
       } catch (error : any) {
            console.log("signup error", error);             
           toast.error(error.message); 
       } finally {
        setLoading(false);
       }   
    }
    useEffect(() => {
        if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    

    return (
        <div className="w-full h-screen flex flex-col gap-4 justify-center items-center ">
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input type="text"
                id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder='username'
                name='username'
                className="input px-4 py-2 border border-gray-300 outline-none focus:border-blue-500 me-4"
             />
            <label htmlFor="email">email</label>
            <input type="text"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder='email'
                name='email'
                className="input px-4 py-2 border border-gray-300 outline-none focus:border-blue-500 me-4"
             />
            <label htmlFor="password">password</label>
            <input type="text"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder='password'
                name='password'
                className="input px-4 py-2 border border-gray-300 outline-none focus:border-blue-500 me-4"
            />
            <button onClick={onSingup}
            className='px-4 py-2 border border-gray-300 outline-none focus:border-blue-500 me-4 '
            >{buttonDisabled ?  "No signup": "signup"}</button>
           <Link href="/login">already have an account? login</Link>
        </div>
    );
}