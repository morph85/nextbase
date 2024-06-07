import _ from "lodash"
// import type { KeyInfo } from '@/components/interfaces'
// import FormUtil from '@/components/form/util'
// import StringUtil from '@/utils/string'
// import Constants from '@constants'
// import DataConstants from '@/data/dataconstants'
// import type { TabInfo } from '@/components/tabs/interface'
// import type { NavItem } from '@/components/navbar/navitem'
// import type { TableColInfo } from '@/components/table/interfaces'

const RequestUtil = {
  camelize: (obj: any) => {
    // method (1)
    return _.transform(obj, (acc: any, value, key: string, target) => {
      const camelKey = _.isArray(target) ? key : _.camelCase(key)
      acc[camelKey] = _.isObject(value) ? RequestUtil.camelize(value) : value
    })
  },

  snakeCase: (s: any) => {
    // return _
    //   .chain(s)
    //   .split(/(\d+)/)
    //   .map(RequestUtil.snakeCase)
    //   .join('')
    //   .value()
    if (s?.includes(".")) {
      return s
        .split(".")
        .map((w: string) => RequestUtil.snakeCase(w))
        .join(".")
    }
    return s
      .replace(/[0-9][a-z]/, (b: string) => b.toUpperCase()) // digit with small letter
      .replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/) // split any with capital letter
      .map((w: string) => w.toLowerCase())
      .join("_")
      .replace(/_+/g, "_") // clear duplicates
    // result = [
    //   [snakeCase('scoreA')],
    //   [snakeCase('score0B')],
    //   [snakeCase('w9Status')],
    //   [snakeCase('w9status')],
    //   [snakeCase('w9_Status')],
    //   [snakeCase('w9 Status')],
    //   [snakeCase('object.status')],
    // ]
  },

  snakize: (obj: any) => {
    // method (1)
    return _.transform(obj, (acc: any, value, key: string, target) => {
      const camelKey = _.isArray(target) ? key : RequestUtil.snakeCase(key)
      acc[camelKey] = _.isObject(value) ? RequestUtil.snakize(value) : value
    })
  },

  // uploadAllFiles: async (fileType: string = DataConstants.UploadFileType.UNKNOWN,
  //   fileList: Array<Record<string, any>> = [],
  //   uploadFunc: Function = () => {},
  //   source: any,
  //   customPath?: string) => {
  //   // uploads
  //   const promises = []
  //   let promise
  //   const list = fileList
  //   for (const f in list) {
  //     const fileInfo = list[f]

  //     // no raw file, proceed
  //     if (!fileInfo.hasOwnProperty('raw')) {
  //       promises.push(fileInfo)
  //       continue
  //     }
  //     const file = fileInfo.raw

  //     let id = file?.uid
  //     if (id == null || id?.length <= 0) {
  //       id = `${StringUtil.random(13, '0123456789')}`
  //     }

  //     const formData = new FormData()
  //     formData.append('file', file)
  //     promise = uploadFunc(source, undefined, formData, { // always create
  //       id,
  //       type: fileType,
  //       fileindex: 0,
  //       fileName: file.name,
  //     }, undefined, customPath)
  //     promises.push(promise)
  //   }
  //   const allFiles = await Promise.all(promises)
  //   return allFiles
  // },
}

export default RequestUtil
