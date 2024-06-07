import "client-only"

import { getCookie } from "cookies-next"

import { KEY_TOKEN } from "./cookie-const"

const Cookie = {
  // token

  getToken: () => {
    return getCookie(KEY_TOKEN)
  },
}

export default Cookie
