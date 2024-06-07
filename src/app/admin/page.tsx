"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"

import BasePage from "@/components/sub/page"
import CookieClient from "@/store/cookie-client"

const Admin = () => {
  const router = useRouter()
  const token = CookieClient.getToken()
  const isToken = token != null && token?.length > 0

  useEffect(() => {
    setTimeout(() => {
      router.push(isToken ? "/admin/dashboard" : "/admin/login")
    }, 300)
  }, [isToken, router])

  return (
    <BasePage className="w-full" height="50vw" center="true">
      <div className="w-auto p-4">Admin, redirecting...</div>
    </BasePage>
  )
}

export default Admin
