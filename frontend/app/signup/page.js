"use client"

import { useState } from "react"
import API from "@/services/api"

export default function Signup(){

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleSignup = async () => {

    try{

      await API.post("/signup",{
        name,
        email,
        password
      })

      alert("Signup successful")

    }catch(error){

      alert("Signup failed")

    }

  }

  return(

    <div className="p-10">

      <h2 className="text-2xl mb-4">Signup</h2>

      <input
        placeholder="Name"
        className="border p-2 block mb-3"
        onChange={(e)=>setName(e.target.value)}
      />

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
        onClick={handleSignup}
        className="bg-green-700 text-white px-4 py-2"
      >
        Signup
      </button>

    </div>

  )

}