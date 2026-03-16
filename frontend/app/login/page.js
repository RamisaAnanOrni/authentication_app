"use client"

import { useState } from "react"
import API from "@/services/api"
import { useRouter } from "next/navigation"

export default function Login(){

  const router = useRouter()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleLogin = async () => {

    try{

      const res = await API.post("/login",{
        email,
        password
      })

      if (!res.data.access_token) {
        alert(res.data.detail || "Login failed")
        return
      }

      localStorage.setItem("token", res.data.access_token)
      router.push("/dashboard")

    }catch(error){

      alert(error.response?.data?.detail || "Login failed")

    }

  }
  return(

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100">

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold mb-6 text-green-700">Welcome Back</h2>

        <input
          placeholder="Email Address"
          className="border border-gray-300 p-3 block mb-4 w-full rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-3 block mb-6 w-full rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-green-700 text-white px-6 py-3 w-full rounded-lg font-semibold hover:bg-green-800 transition"
        >
          Sign In
        </button>

      </div>

    </div>

  )

}