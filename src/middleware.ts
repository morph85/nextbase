import { NextRequest, NextResponse } from "next/server"
// import { decrypt } from '@/app/lib/session'
// import { cookies } from 'next/headers'

const CNAME = "middleware"

import adminMiddleware from "@/middleware/admin"
import apiMiddleware from "@/middleware/api"

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  if (path.startsWith("/admin")) {
    return adminMiddleware(req)
  }
  if (path.startsWith("/api")) {
    return apiMiddleware(req)
  }
  console.log(`${CNAME}: path`, path)
  return NextResponse.next()
}

// routes middleware should not run on
export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.png$).*)"],
}
