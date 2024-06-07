import { NextResponse } from "next/server"
import { getPublicToken } from "@/app/api/util"

import Constants from "@/constants"
import RequestUtil from "@/utils/request"
import Api from "@/app/api/api"

export async function GET() {
  let params = {
    page: 1,
    size: 999,
    direction: "desc",
    sort: RequestUtil.snakeCase("createdAt"),
    // status: JobStatus.OPEN,
  }
  params = RequestUtil.snakize(params)
  let token = await getPublicToken()
  let headers = { Authorization: `Bearer ${token}` }
  let response = await Api.get(
    `${Constants.BASE_API_AIMS}public/opening`,
    params,
    headers,
  )
  response = RequestUtil.camelize(response)
  return NextResponse.json(response)
}
