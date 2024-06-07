export const StringUtil = {
  random(length = 8, words = "ABCDEF0123456789") {
    let text = ""
    const possible = words
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  },

  getHash: () => {
    const abc = "abcdefghijklmnopqrstuvwxyz1234567890".split("")
    let token = ""
    for (let i = 0; i < 32; i++) {
      token += abc[Math.floor(Math.random() * abc.length)]
    }
    return token
  },

  commafy: (value: any, isPrice = false) => {
    let str: any = Math.round(parseFloat(value) * 100) / 100
    if (isPrice) {
      str = str.toFixed(2)
    }
    str = str.toString().split(".")
    if (str[0].length >= 4) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,")
    }
    if (str[1] && str[1].length >= 4) {
      str[1] = str[1].replace(/(\d{3})/g, "$1 ")
    } else if (!str[1] && isPrice) {
      str.push("00")
    }
    return str.join(".")
  },

  formatPrice: (value: any, prefix = "$", isPrice = false) => {
    if (value == null || isNaN(parseFloat(value))) return value // passthrough
    value = parseFloat(value)
    const isNeg = value < 0
    if (isNeg) value *= -1
    const valueString = StringUtil.commafy(value, isPrice)
    return `${isNeg ? "-" : ""}${prefix}${valueString}`
  },

  truncateMiddle: (fullstr: string, max: number, separator = "...") => {
    if (fullstr.length <= max) return fullstr
    const sepLen = separator.length
    const charsToShow = max - sepLen
    const frontChars = Math.ceil(charsToShow / 2)
    const backChars = Math.floor(charsToShow / 2)
    return (
      fullstr.substr(0, frontChars) +
      separator +
      fullstr.substr(fullstr.length - backChars)
    )
  },

  // pad: (total: number, def = ' ') => {
  //   let string = ''
  //   for (let t = 0; t < total; t++) {
  //     string += def
  //   }
  //   return string
  // },

  padFill: (
    numOrText: string | number,
    len: number,
    def = "0",
    padLeft = true,
  ) => {
    let s = `${numOrText}`
    if (padLeft) {
      while (s.length < len) s = def + s
    } else {
      while (s.length < len) s = s + def
    }
    return s
  },

  pluralPhrase: (val: number | undefined, suffix: string = "") => {
    if (val == null || `${val}`.length <= 0) return ""
    const value = parseInt(`${val}`, 10)
    if (!isFinite(value) || isNaN(value)) return ""
    return `${value} ${suffix}${value > 1 ? "s" : ""}`
  },

  isBlank: (val: number | string | undefined) => {
    return val == null || `${val}`.length <= 0
  },

  nullBlank: (
    prefix: string = "",
    val: string | undefined | null,
    suffix: string = "",
  ) => {
    return (val != null && `${prefix}${val}${suffix}`) || ""
  },

  entityDecode: (str: string) => {
    const htmlEntities: Record<string, string> = {
      nbsp: " ",
      cent: "¢",
      pound: "£",
      yen: "¥",
      euro: "€",
      copy: "©",
      reg: "®",
      lt: "<",
      gt: ">",
      quot: '"',
      amp: "&",
      apos: "'",
    }

    return str.replace(/\&([^;]+);/g, (entity, entityCode) => {
      let match
      if (entityCode in htmlEntities) {
        return htmlEntities[entityCode]
        /*eslint no-cond-assign: 0*/
      } else if ((match = entityCode.match(/^#x([\da-fA-F]+)$/))) {
        return String.fromCharCode(parseInt(match[1], 16))
        /*eslint no-cond-assign: 0*/
      } else if ((match = entityCode.match(/^#(\d+)$/))) {
        return String.fromCharCode(~~match[1])
      } else {
        return entity
      }
    })
  },
}

export default StringUtil
