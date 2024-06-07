import { NextRequest, NextResponse } from "next/server"
import Cookie from "@/store/cookie"

const CNAME = "middleware/admin"

// 1. specify protected and public routes
// const protectedRoutes = [
//   '/admin',
// ]
const publicRoutes = ["/admin/login"]

const AdminMiddleware = (req: NextRequest) => {
  const path = req.nextUrl.pathname
  console.log(`${CNAME}: path`, path)

  // 2. check if the current route is protected or public
  // const isProtectedRoute = protectedRoutes.includes(path)
  const isAdminRoute = path.startsWith("/admin")
  const isPublicRoute = publicRoutes.includes(path)

  // 3. decrypt the session from the cookie
  // const cookie = cookies().get('session')?.value
  const token = Cookie.getToken() // await decrypt(cookie)
  const isToken = token != null && token?.length > 0

  // 6. redirect to /dashboard if the user is authenticated
  if (isPublicRoute && isToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl))
  }

  // 5. redirect to /login if the user is not authenticated
  if (isAdminRoute && !isPublicRoute && !isToken) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl))
  }

  return NextResponse.next()
}

export default AdminMiddleware
