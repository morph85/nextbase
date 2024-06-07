import { NextResponse } from "next/server"
// import { getPublicToken } from '@/app/api/util'
import Cookie from "@/store/cookie"

import Constants from "@/constants"
import RequestUtil from "@/utils/request"
import Api from "@/app/api/api"

export async function POST(request: Request) {
  const data = await request.json()
  let response = await Api.post(`${Constants.BASE_API_AIMS}auth/login`, data)
  response = RequestUtil.camelize(response)
  console.log("-- login response", response)

  // set token
  console.log("-- previous TOKEN", Cookie.getToken())
  console.log("-- current TOKEN", response?.token)
  if (response?.token?.length > 0) {
    Cookie.setToken(response.token)
  }

  return NextResponse.json(response)
}
