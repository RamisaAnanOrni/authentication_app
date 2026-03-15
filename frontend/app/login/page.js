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

    <div className="p-10">

      <h2 className="text-2xl mb-4">Login</h2>

      <input
        placeholder="Email"
        className="border p-2 block mb-3"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 block mb-3"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-green-700 text-white px-4 py-2"
      >
        Login
      </button>

    </div>

  )

}