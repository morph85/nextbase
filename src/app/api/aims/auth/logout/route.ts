import { NextResponse } from "next/server"
// import { getPublicToken } from '@/app/api/util'
import Cookie from "@/store/cookie"

// import Constants from '@/constants'
// import RequestUtil from '@/utils/request'
// import Api from '@/app/api/api'

export async function POST(request: Request) {
  // const data = await request.json()
  // let response = await Api.post(`${Constants.BASE_API_AIMS}auth/logout`, data)
  // response = RequestUtil.camelize(response)
  Cookie.deleteToken()
  return NextResponse.json({ status: "success", data: {} })
}
