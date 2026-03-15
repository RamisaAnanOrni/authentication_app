"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Dashboard(){

  const router = useRouter()

  useEffect(()=>{

    const token = localStorage.getItem("token")

    if(!token){
      router.push("/login")
    }

  },[])

  const logout = () => {

    localStorage.removeItem("token")

    router.push("/login")

  }

  return(

    <div className="p-10">

      <h2 className="text-2xl">Welcome to AgriCore Dashboard</h2>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 mt-5"
      >
        Logout
      </button>

    </div>

  )

}