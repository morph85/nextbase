import { NextRequest, NextResponse } from "next/server"

const CNAME = "middleware/api"

const ApiMiddleware = (req: NextRequest) => {
  const path = req.nextUrl.pathname
  console.log(`${CNAME}: path`, path)

  // switch (path) {
  //   case '/api/aims/auth/login':
  //     console.log(`${CNAME}: login!`, path)
  //     break
  //   case '/api/aims/auth/logout':
  //     console.log(`${CNAME}: logout!`, path)
  //     break
  //   default:
  //     break
  // }

  return NextResponse.next()
}

export default ApiMiddleware
