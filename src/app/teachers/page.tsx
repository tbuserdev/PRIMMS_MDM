"use client"

import * as React from "react"
import Link from "next/link"

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard Page</h1>
            <Link href="/"> 
                Go back to home
            </Link>
        </div>
    )
};