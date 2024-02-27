"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function UserProfilePage() {

    const router = useRouter()

    const onLogout = async () => {
        try {
            await axios.get("api/users/logout")
            router.push("/login")
        } catch (error: any) {

            console.log(error)

        }
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>User Profile Page</h1>
            <br></br>
            <br></br>

            <button
                className="bg-gray-500 mt-3 text-black px-2 py-1 rounded"
                onClick={onLogout}
            >Logout</button>
        </div>
    )
}