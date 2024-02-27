"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function UserProfilePage() {

    const router = useRouter()
    const [data, setData] = useState("initial")


    //Logout logic
    const onLogout = async () => {
        try {
            await axios.get("api/users/logout")
            router.push("/login")
        } catch (error: any) {

            console.log(error)

        }
    }


    //Get the User Details
    const getUserDetails = async () => {
        const res = await axios.get("/api/users/userdata")
        console.log(res.data)
        setData(res.data.data.username)
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>User Profile Page</h1>
            <br></br>
            <br></br>

            <h2>Username:    <span className="p-1.5 rounded bg-gray-500 text-black"> {data === "initial" ? "Not found" : data}</span></h2>

            <br></br>
            <br></br>

            <button
                className="bg-gray-500 mt-3 text-black px-2 py-1 rounded"
                onClick={onLogout}
            >Logout</button>
        </div>
    )
}
