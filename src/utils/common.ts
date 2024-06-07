const Common = {
  timeout: (interval: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(undefined)
      }, interval)
    })
  },
}

export default Common
