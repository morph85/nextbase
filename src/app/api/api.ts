import _ from "lodash"

const Api = {
  get: async (
    path: string,
    params: Record<string, any> = {},
    headers: undefined | HeadersInit = undefined,
  ) => {
    try {
      let sparams = new URLSearchParams(params)
      let response = await fetch(`${path}?${sparams}`, {
        method: "GET",
        headers: {
          // ...(token != null ? { 'Authorization': `Bearer ${token}` } : {}),
          Accept: "application/json",
          "Content-Type": "application/json",
          ...headers,
        },
      })
      return response.json?.()
    } catch (error: any) {
      console.error(error)
      Promise.reject(error)
    }
  },

  post: async (
    path: string,
    data: Record<string, any> = {},
    headers: undefined | HeadersInit = undefined,
  ) => {
    try {
      let response = await fetch(path, {
        method: "POST",
        headers: {
          // ...(token != null ? { 'Authorization': `Bearer ${token}` } : {}),
          Accept: "application/json",
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(data),
      })
      return response.json?.()
    } catch (error: any) {
      console.error(error)
      Promise.reject(error)
    }
  },

  upload: async (
    path: string,
    file: any,
    data: Record<string, any> = {},
    headers: undefined | HeadersInit = undefined,
  ) => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      if (formData && data && !_.isEmpty(data)) {
        const sdata = data // Util.request.snakize(data)
        for (const key in sdata) {
          formData.append(key, sdata[key])
        }
      }
      let response = await fetch(path, {
        method: "POST",
        headers: {
          // ...(token != null ? { 'Authorization': `Bearer ${token}` } : {}),
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          ...headers,
        },
        body: formData, // either formData or file direction depending server format
        // maxBodyLength: 100 * 1024 * 1024,
      })
      return response.json?.()
    } catch (error: any) {
      console.error(error)
      Promise.reject(error)
    }
  },
}

export default Api
