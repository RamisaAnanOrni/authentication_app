"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import API from "@/services/api"

export default function Dashboard(){

  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const token = localStorage.getItem("token")
    if (!token || token === "undefined") {
      router.push("/login")
      return
    }

    API.get("/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUser(res.data)
      })
      .catch(() => {
        localStorage.removeItem("token")
        router.push("/login")
      })
      .finally(() => setLoading(false))

  }, [router])

  const logout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  if (loading) return <div className="p-10">Loading...</div>
  if (!user) return null

  const isAdmin = user.role?.toLowerCase() === "admin"

  return (

    <div className="p-10">

      <h2 className="text-2xl">
        {isAdmin ? "Admin Dashboard" : "Customer Dashboard"}
      </h2>
      <p className="text-gray-600 mt-1">{user.email}</p>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 mt-5"
      >
        Logout
      </button>

    </div>

  )

}