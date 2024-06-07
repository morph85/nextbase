import { SECRET_KEY } from "@/constants"
import StringUtil from "@/utils/string"
import bcrypt from "bcryptjs"

export async function getPublicToken() {
  const clientKey = StringUtil.getHash()
  const secretKey = `${SECRET_KEY}${clientKey}`
  const salt = await bcrypt.genSalt(10)
  const hashedKey = await bcrypt.hash(secretKey, salt)
  const token = `${clientKey}|${hashedKey}`
  // console.log('-- info', {
  //   salt,
  //   clientKey,
  //   hashedKey,
  //   secretKey,
  //   token,
  //   isVerifyCompare: await bcrypt.compare(secretKey, hashedKey),
  // })
  return token
}

const ApiUtil = {}
export default ApiUtil
