import _ from "lodash"
import FileUtil from "@/utils/file"
// import ObjectUtil from '@/utils/object'
import type { KeyInfo } from "@/components/form/forminterface"
// import type { /* FormRules, */ FormItemRule } from 'element-plus'
// import type { Arrayable } from 'element-plus/es/utils'
// import DataConstants from '@/data/dataconstants'

export function objectGet(object: Record<string, any>, dotkey: string) {
  const getProp = (obj: Record<string, any>, prop: string) => {
    return prop.split(".").reduce((r, e) => {
      if (r === undefined || r === null) {
        return undefined
      }
      return r[e]
    }, obj)
  }
  return getProp(object, dotkey)
}

export function clearDefaults(
  existing: Record<string, any> = {},
  keyvalues: Array<KeyInfo> = [],
) {
  const defs: Record<string, any> = {}
  for (const k in keyvalues) {
    const keyvalue = keyvalues[k]
    const key = keyvalue.key as string
    if (existing.hasOwnProperty(key)) {
      if (Array.isArray(existing[key])) {
        existing[key].splice(0, existing[key]?.length)
      } else {
        delete existing[key]
      }
    }
    const def = keyvalue.default
    defs[key] = def
  }
  return _.merge(existing, defs)
}

export function clearAll(
  existing: Record<string, any> = {},
  options: Record<string, any> = {
    isClearObject: false,
    excludes: [],
  },
) {
  if (existing == null) return
  const isClearObject = options?.isClearObject
  const keys = Object.keys(existing)
  for (const k in keys) {
    const key = keys[k]
    if (options?.excludes?.includes(key)) {
      continue
    }
    if (existing.hasOwnProperty(key)) {
      if (Array.isArray(existing[key])) {
        existing[key].splice(0, existing[key]?.length)
        if (isClearObject) {
          delete existing[key]
        }
      } else if (typeof existing[key] === "object") {
        clearAll(existing[key])
        existing[key] = {}
        if (isClearObject) {
          delete existing[key]
        }
      } else {
        delete existing[key]
      }
    }
  }
}

export function getDefaults(keyvalues: Array<KeyInfo> = []) {
  const defs: Record<string, any> = {}
  for (const k in keyvalues) {
    const keyvalue = keyvalues[k]
    const key = keyvalue.key as string
    if (!keyvalue.hasOwnProperty("default")) continue
    const def = keyvalue.default
    defs[key] = def
  }
  return defs
}

export function setDefaults(existing = {}, keyvalues: Array<KeyInfo> = []) {
  const defs: Record<string, any> = {}
  for (const k in keyvalues) {
    const keyvalue = keyvalues[k]
    const key = keyvalue.key as string
    if (!keyvalue.hasOwnProperty("default")) continue
    const def = keyvalue.default
    defs[key] = def
  }
  return _.merge(existing, defs)
}

// export function setAttrs (attrs: Array<FormAttrInfo>, ftype: string | Array<string>) {
//   if (typeof ftype === 'string') {
//     attrs = _.filter(attrs, (attr) => {
//       return (attr.includes == null || attr.includes.length <= 0 || attr.includes?.includes(ftype))
//     })
//     attrs = _.map(attrs, (attr) => {
//       const disabled = (attr.disableds != null && attr.disableds.length > 0 && attr.disableds?.includes(ftype))
//       return {
//         disabled,
//         ...attr,
//       }
//     })
//   } else if (Array.isArray(ftype)) {
//     attrs = _.filter(attrs, (attr) => {
//       return (attr.includes == null || attr.includes.length <= 0 || _.intersection(attr.includes, ftype).length > 0)
//     })
//     attrs = _.map(attrs, (attr) => {
//       const disabled = (attr.disableds != null && attr.disableds.length > 0 && _.intersection(attr.disableds, ftype).length > 0)
//       return {
//         disabled,
//         ...attr,
//       }
//     })
//   }
//   return attrs
// }

// export function setAttrsExcludes (attrs: Array<FormAttrInfo>, ftype: string | Array<string>) {
//   if (typeof ftype === 'string') {
//     attrs = _.filter(attrs, (attr) => {
//       return (attr.excludes == null || attr.excludes.length <= 0 || !attr.excludes?.includes(ftype))
//     })
//   } else if (Array.isArray(ftype)) {
//     attrs = _.filter(attrs, (attr) => {
//       return (attr.excludes == null || attr.excludes.length <= 0 || _.intersection(attr.excludes, ftype).length <= 0)
//     })
//   }
//   return attrs
// }

// parse data

export function parsePreprocess(
  keyinfos: Array<KeyInfo>,
  form: Record<string, any>,
) {
  // format: { key, type, default }

  for (const ki in keyinfos) {
    const keyinfo = keyinfos[ki]
    const key = keyinfo.key
    const source = keyinfo.source
    const vtype = keyinfo.vtype
    switch (vtype) {
      case "array":
        if (
          form[source || key] &&
          Array.isArray(form[source || key]) &&
          form[source || key].length > 0
        ) {
          form[source || key].splice(0, form[source || key].length)
        }
        break
      default:
        break
    }
  }
}

export function parseData(
  keyinfos: Array<KeyInfo>,
  data: Record<string, any>,
  {
    doCombine = false,
    doDeleteDataKey = false,
    setDefaults = false,
    FormConstants = {},
    options = {},
  } = {},
) {
  // format: { key, type, default }

  const params = { doCombine, doDeleteDataKey, setDefaults, FormConstants }
  if (!data) {
    console.error("invalid request data")
    return
  }

  let form: Record<string, any> = {}
  for (const ki in keyinfos) {
    const keyinfo = keyinfos[ki]

    // custom load
    if (typeof keyinfo.loadFrom === "function") {
      keyinfo.loadFrom(keyinfo, form, data, options)
      continue
    }

    // check key
    const key = keyinfo.key
    const source = keyinfo.source
    const def = keyinfo.hasOwnProperty("default") ? keyinfo.default : null
    if (!source && !data.hasOwnProperty(key)) {
      if (def !== null && setDefaults) {
        form[key] = def
      } else {
        form[key] = undefined
      }
      // ignore
      continue
    }

    // alt source
    if (source && source.includes(".") && !data.hasOwnProperty(key)) {
      data[key] = objectGet(data, source)
    } else if (source && !data.hasOwnProperty(key)) {
      data[key] = data[source]
    }

    // for null
    const vtype = keyinfo.vtype
    let value = data[key]
    if (value === null || value === undefined) {
      if (def !== null && setDefaults) {
        form[key] = def
      } else {
        form[key] = undefined
      }
      continue
    }

    // by vtype
    switch (vtype) {
      case "string":
        form[key] = data[key]
        break
      case "date":
        form[key] = data[key]
        if (
          keyinfo.hasOwnProperty("dateFormatter") &&
          typeof keyinfo.dateFormatter === "function"
        ) {
          const dateFormatter = keyinfo.dateFormatter
          form[key] = dateFormatter(form[key])
        }
        break
      case "float":
        if (isNaN(parseFloat(value))) {
          console.error(`invalid request key: ${key} for type: ${vtype}`)
          continue
        }
        form[key] = parseFloat(value)
        break
      case "id":
      case "int":
        if (typeof value === "boolean") {
          switch (value) {
            case true:
              value = 1
              break
            case false:
              value = 0
              break
            case null:
            case undefined:
            default:
              break
          }
        }
        if (isNaN(parseInt(value, 10)) && keyinfo.isIntNanString) {
          form[key] = value
          continue
        } else if (isNaN(parseInt(value, 10))) {
          console.error(`invalid request key: ${key} for type: ${vtype}`)
          continue
        }
        form[key] = parseInt(value, 10)
        break
      case "bool":
      case "boolean":
        form[key] = data[key]
        if (typeof data[key] === "string") {
          if (data[key] === "true" || data[key] === "false") {
            form[key] = data[key] === "true"
          } else if (!isNaN(parseInt(data[key]))) {
            form[key] = parseInt(data[key])
          }
        }
        if (typeof data[key] === "boolean" && keyinfo.boolToFormInt === true) {
          form[key] = data[key] == null ? null : data[key] ? 1 : 0
        }
        if (keyinfo.hasOwnProperty("forceBool") && keyinfo.forceBool) {
          form[key] = data[key] == null ? null : !!data[key]
        }
        break
      case "files":
        form[key] = parseFile(data[key])
        break
      case "object":
        form[key] = data[key]
        // if (Array.isArray(data[key]) && data[key]?.length > 0 && keyinfo.forceObject) {
        //   form[key] = data[key][0]
        // }
        break
      case "features":
        form[key] = _.map(data[key], (item) => {
          const featureName = item.featureName || "feature"
          return {
            value: item[featureName],
          }
        })
        break
      case "array": {
        let value = data[key]
        if (!Array.isArray(value)) {
          form[key] = value
          console.error(`invalid array data type for key: ${key}`)
          break
        }
        // array
        const subkey = keyinfo.subkey
        value = _.map(value, (item) => {
          if (
            subkey &&
            subkey.length > 0 &&
            typeof item === "object" &&
            item.hasOwnProperty(subkey)
          ) {
            return item[subkey]
          }
          return item
        })
        if (
          keyinfo.hasOwnProperty("arrayKeyInfos") &&
          Array.isArray(keyinfo.arrayKeyInfos)
        ) {
          const subkeyinfos = keyinfo.arrayKeyInfos
          value = _.map(value, (aitem) => {
            aitem = parseData(subkeyinfos, aitem, params)
            return aitem
          })
        } else if (
          keyinfo.hasOwnProperty("arrayLoad") &&
          typeof keyinfo.arrayLoad === "function"
        ) {
          value = keyinfo.arrayLoad(value)
        }
        form[key] = value
        break
      }
      case "array-ids": {
        let value = data[key]
        if (!Array.isArray(value)) {
          if (typeof value === "string" || typeof value === "number") {
            // in case of route url provided single entry
            value = [value]
          } else {
            form[key] = value
            console.error(`invalid array data type for key: ${key}: ${value}`)
            break
          }
        }
        const idKey = keyinfo.idKey
        if (idKey) {
          value = _.map(value, (it) => {
            return it && it[idKey]
          })
        }
        value = _.map(value, (it) => {
          if (!isNaN(parseInt(it, 10))) {
            return parseInt(it, 10)
          }
          return it
        })
        form[key] = value
        break
      }
      default:
        form[key] = data[key]
        console.error(`invalid request key: ${key} for type: ${vtype}`)
        break
    }

    // alias
    const alias = keyinfo.alias
    if (alias && alias.length > 0) {
      data[alias] = form[key] // copy to alias
      form[alias] = form[key]
    }
    if (doDeleteDataKey) {
      delete data[key]
    }
  }
  if (doCombine) {
    form = _.assign({}, data, form)
  }
  return form
}

// parse form

export function parseFile(files: Array<Record<string, any>>) {
  if (!files) {
    return []
  }

  if (typeof files === "object" && !Array.isArray(files)) {
    // in case object is single file
    files = [files]
  }

  // format
  // 0: {uploadId: 235,…}
  //   created_at: "2020-06-24 07:26:08"
  //   description: null
  //   fullUrl: "https://iris-acc360-docs.s3.us-east-2.amazonaws.com/presales/item/private/images/366836/3Az1DpYhpPMXPjHOQN9MWJXwDDgWuzzeZhtyQqUf.jpeg"
  //   status: null
  //   type: "item-setup"
  //   updated_at: "2020-06-24 07:26:08"
  //   uploadId: 235
  //   uploadable_id: 18
  //   uploadable_type: "App\Model\Presales\presalesItems"
  //   url: "presales/item/private/images/366836/3Az1DpYhpPMXPjHOQN9MWJXwDDgWuzzeZhtyQqUf.jpeg"

  const parsed = _.map(files, (file) => {
    const parse = {
      ...file,
    }
    if (file && file.url) {
      const name = FileUtil.getPathFilename(file.url)
      parse.name = name
      parse.fileName = file?.fileName || file?.reqdata?.fileName || name
    }
    // if (file && file.fullUrl) {
    //   parse.url = file.fullUrl
    // }
    return parse
  })
  return parsed
}

export function parseForm(
  keyinfos: Array<KeyInfo>,
  form: Record<string, any>,
  { doIsolate = true, doKeysOnly = true, options = {} } = {},
) {
  // format: { key, type, default }
  console.debug("FormUtil: parse form", keyinfos, form)

  const params = { doIsolate, doKeysOnly }

  if (!form) {
    console.error("invalid request form")
    return
  }
  if (doIsolate) {
    form = _.assign({}, form)
  }

  let newForm: Record<string, any> = {}
  for (const ki in keyinfos) {
    const keyinfo = keyinfos[ki]

    // // skip
    // const skipForm = keyinfo.skipForm
    // if (skipForm) continue

    // check key
    const key = keyinfo.key
    if (!form.hasOwnProperty(key)) {
      // ignore
      continue
    }

    // empty null
    const value = form[key]
    if (keyinfo.isEmptyNull && (value == null || `${value}`.length <= 0)) {
      newForm[key] = null
      continue
    }

    // for null
    if (value === null || value === undefined) {
      form[key] = undefined // ??
      continue
    }

    // by vtype
    const vtype = keyinfo.vtype
    switch (vtype) {
      case "string":
        newForm[key] = form[key]
        // if (typeof newForm[key] === 'string' && keyinfo.trimWhitespace === true) {
        //   newForm[key] = newForm[key].trim()
        // }
        break
      case "float":
        if (isNaN(parseFloat(value))) {
          console.error(`invalid request key: ${key} for type: ${vtype}`)
          continue
        }
        newForm[key] = parseFloat(value)
        break
      case "id":
      case "int":
        if (isNaN(parseInt(value, 10))) {
          console.error(`invalid request key: ${key} for type: ${vtype}`, value)
          continue
        }
        newForm[key] = parseInt(value, 10)
        break
      case "bool":
      case "boolean":
        if (typeof form[key] === "number" && keyinfo.boolToFormInt === true) {
          newForm[key] =
            form[key] === 1 ? true : form[key] === 0 ? false : undefined
        } else {
          newForm[key] = form[key]
        }
        break
      case "files":
        newForm[key] = parseFile(form[key])
        break
      case "object":
        newForm[key] = form[key]
        break
      // case 'features':
      //   newForm[key] = _.map(form[key], (item) => {
      //     const featureName = item.featureName || 'feature'
      //     return {
      //       value: item[featureName],
      //     }
      //   })
      //   break
      case "array-ids":
        newForm[key] = _.map(form[key], (id) => {
          if (isNaN(parseInt(id, 10))) {
            return undefined
          }
          return parseInt(id, 10)
        })
        newForm[key] = _.without(newForm[key], undefined)
        break
      case "array": {
        // newForm[key] = form[key]

        let value = form[key]
        if (!Array.isArray(value)) {
          newForm[key] = value
          console.error(`invalid array data type for key: ${key}`)
          break
        }
        // array
        const subkey = keyinfo.subkey
        value = _.map(value, (item) => {
          if (
            subkey &&
            subkey.length > 0 &&
            typeof item === "object" &&
            item.hasOwnProperty(subkey)
          ) {
            return item[subkey]
          }
          return item
        })
        if (
          keyinfo.hasOwnProperty("arrayKeyInfos") &&
          Array.isArray(keyinfo.arrayKeyInfos)
        ) {
          const subkeyinfos = keyinfo.arrayKeyInfos
          value = _.map(value, (aitem) => {
            aitem = parseForm(subkeyinfos, aitem, params)
            return aitem
          })
        } else if (
          keyinfo.hasOwnProperty("arraySave") &&
          typeof keyinfo.arraySave === "function"
        ) {
          value = keyinfo.arraySave(value)
        }
        newForm[key] = value
        break
      }
      case "date":
        newForm[key] = form[key]
        break
      default:
        newForm[key] = form[key]
        console.error(`invalid request key: ${key} for type: ${vtype}`)
        break
    }

    // custom save
    if (typeof keyinfo.saveTo === "function") {
      keyinfo.saveTo(keyinfo, newForm, form, options)
    }

    // alias
    const alias = keyinfo.alias
    if (alias && alias.length > 0) {
      newForm[alias] = newForm[key] // copy to alias
    }

    // omit
    const omit = keyinfo.omit
    if (omit && newForm[key]) {
      delete newForm[key]
    }
  }
  if (!doKeysOnly) {
    newForm = _.assign({}, form, newForm)
  }
  return newForm
}

// export function getRule (rules: Record<string, Arrayable<Record<string, any>>>, itemId: string, ruleName: string) {
//   const subrules = rules?.[itemId]
//   if (Array.isArray(subrules)) {
//     if (ruleName === 'required') {
//       const filteredRules = _.filter(subrules, (r) => r.hasOwnProperty('required'))
//       return filteredRules
//     }
//     const rule = _.find(subrules, (r) => r.name === ruleName)
//     return rule
//   }
//   return subrules?.[ruleName]
// }

// export function getFormRule (rules: Record<string, Arrayable<FormRule>>, key: string, ruleName: string) {
//   const subrules = rules?.[key]
//   if (Array.isArray(subrules)) {
//     const rule = _.find(subrules, (r) => r.name === ruleName)
//     return rule
//   }
//   return subrules
// }

export function filterQuery(query: Record<string, any>) {
  return _.omitBy(
    query,
    (val) => val == null /* || val === DataConstants.FILTER_ALL */,
  )
}

const FormUtil = {
  objectGet,
  clearDefaults,
  clearAll,
  getDefaults,
  setDefaults,
  // setAttrs,
  // setAttrsExcludes,
  parsePreprocess,
  parseData,
  parseFile,
  parseForm,
  // getRule,
  // getFormRule,
  filterQuery,
}

export default FormUtil
