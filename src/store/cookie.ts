import "server-only"

import { cookies as CookiesStore } from "next/headers"

import { KEY_TOKEN } from "./cookie-const"

const DAY = 24 * 60 * 60 * 1000
const SET_OPT = { expires: Date.now() + 7 * DAY }

const Cookie = {
  // token

  getToken: () => {
    const cookiesStore = CookiesStore()
    return cookiesStore.get(KEY_TOKEN)?.value
  },

  setToken: (token: string) => {
    const cookiesStore = CookiesStore()
    return cookiesStore.set(KEY_TOKEN, token, SET_OPT)
  },

  deleteToken: () => {
    const cookiesStore = CookiesStore()
    return cookiesStore.delete(KEY_TOKEN)
  },
}

export default Cookie
