"use client";
import toast from 'react-hot-toast';

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";


export default function loginPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("Response", response)
            const message = response.data.message
            if (message == "Login Successful") {
                router.push("profile")
            }

            if (message == "user doesnt exist") {
                toast.error('User doesn\'t exist. Please check your login details.');
            }


        } catch (error: any) {
            console.log("Login failed", error.message);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="container mx-auto mt-8 p-14 max-w-md">
            <h1 className="text-3xl font-bold mb-4">{loading ? "Logging in..." : "Login Here!"}</h1>



            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                <input
                    type="text"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="mt-1 p-2 w-full border rounded-md text-black"
                    placeholder="Email"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                <input
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    className="mt-1 p-2 w-full border rounded-md text-black"
                    placeholder="Password"
                />
            </div>

            <button onClick={onLogin} className="bg-gray-500 text-white p-2 rounded-md hover:bg-blue-600">
                Signup
            </button>

            <div className="mt-4">
                <Link href="/signup" className="text-white-500 hover:underline">Register Now!</Link>
            </div>
        </div>
    );
}
