"use client"

import Link from "next/link"

export default function Header(){

  return(
    <header className="bg-green-700 text-white px-12 py-4 flex justify-between">

      <h1 className="text-xl font-bold">
        AgriCore
      </h1>

      <nav className="flex gap-4 font-bold">
        <Link href="/">Home</Link>
        <Link href="/signup">Signup</Link>
        <Link href="/login">Login</Link>
        <Link href="/dashboard">Dashboard</Link>
      </nav>

    </header>

  )
}