// import _ from 'lodash'
// import axios from 'axios'
// import StringHelper from './string'
// import DataConstants from '@/data/dataconstants'
// import type { AxiosRequestConfig } from 'axios'

// let textFile: string | undefined = undefined

class FileHelper {
  static getFileTypes() {
    return [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "bmp",
      "tif",
      "tiff",
      "svg",
      "webp",
      "midi",
      "mid",
      "aac",
      "mp3",
      "wav",
      "oga",
      "weba",
      "avi",
      "mpeg",
      "3gp",
      "3g2",
      "ogv",
      "webm",
      "txt",
      "rtf",
      "csv",
      "pdf",
      "doc",
      "docx",
      "xls",
      "xlsx",
      "xlsm",
      "ppt",
      "pptx",
      "zip",
    ]
  }

  static getMimeFileTypes() {
    const types = FileHelper.getFileTypes()
    const info: any = {}
    for (const t in types) {
      const type = types[t]
      const mime = FileHelper.getMime(type)
      if (!info.hasOwnProperty(mime)) {
        info[mime] = []
      }
      info[mime].push(type)
    }
    return info
  }

  static isImage(extension: string) {
    const mime = FileHelper.getMime(extension)
    return mime && mime.includes("image/")
  }

  static getMime(extension: string) {
    switch (extension && extension.toLowerCase()) {
      // image
      case "jpg":
      case "jpeg":
        return "image/jpeg"
      case "png":
        return "image/png"
      case "gif":
        return "image/gif"
      case "bmp":
        return "image/bmp"
      case "tiff":
      case "tif":
        return "image/tiff"
      case "svg":
        return "image/svg+xml"
      case "webp":
        return "image/webp"
      // audio
      case "midi":
      case "mid":
        return "audio/midi"
      case "aac":
        return "audio/aac"
      case "mp3":
        return "audio/mpeg"
      case "wav":
        return "audio/wav"
      case "oga":
        return "audio/ogg"
      case "weba":
        return "audio/webm"
      // video
      case "avi":
        return "video/x-msvideo"
      case "mpeg":
        return "video/mpeg"
      case "3gp":
        return "video/3gpp"
      case "3g2":
        return "video/3gpp2"
      case "ogv":
        return "video/ogg"
      case "webm":
        return "video/webm"
      // doc
      case "txt":
        return "text/plain"
      case "rtf":
        return "application/rtf"
      case "csv":
        return "text/csv"
      case "pdf":
        return "application/pdf"
      case "doc":
        return "application/msword"
      case "docx":
        return "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      case "xls":
        return "application/vnd.ms-excel"
      case "xlsx":
        return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      case "xlsm":
        return "application/vnd.ms-excel.sheet.macroEnabled.12"
      case "ppt":
        return "application/vnd.ms-powerpoint"
      case "pptx":
        return "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      // archive
      case "zip":
        return "application/zip"
      case "rar":
        return "application/vnd.rar"
      case "7z":
        return "application/x-7z-compressed"
      default:
        throw new Error(`invalid handled mime extension: ${extension}`)
    }
  }

  static getPathExt(url: string) {
    // eslint-disable-next-line no-useless-escape
    return url.split(".").pop()?.split(/\#|\?/)[0]
  }

  static getPathFilename(url: string) {
    // eslint-disable-next-line no-useless-escape
    return url.split("/").pop()?.split(/\#|\?/)[0]
  }

  static formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  // text/plain
  // text/csv
  // application/pdf
  // static async output (content: any, mime: string = DataConstants.File.Mime.TEXT_PLAIN) {
  //   const data = new Blob([content], {type: mime})
  //   if (textFile != null) {
  //     window.URL.revokeObjectURL(textFile)
  //   }
  //   textFile = window.URL.createObjectURL(data)
  //   return textFile
  // }
  // static output (content: any, filename: string, filemime: string = DataConstants.File.Mime.TEXT_PLAIN) {
  //   const csvFile = new Blob([content], { type: filemime })
  //   const downloadLink = document.createElement('a')
  //   downloadLink.download = filename
  //   downloadLink.href = window.URL.createObjectURL(csvFile)
  //   downloadLink.style.display = 'none'
  //   document.body.appendChild(downloadLink)
  //   // download
  //   downloadLink.click()
  // }

  // static async download (url: string, param: any = {}) {
  //   const enforceType = param && param.enforceType
  //   // return axios.request({
  //   //   url,
  //   //   method: 'GET',
  //   //   responseType: 'blob'
  //   // }).then(response => {
  //   //   const downloadUrl = window.URL.createObjectURL(new Blob([response.data]))
  //   //   const link = document.createElement('a')
  //   //   link.href = downloadUrl
  //   //   link.setAttribute('download', 'file.jpeg')
  //   //   document.body.appendChild(link)
  //   //   link.click()
  //   //   link.remove()
  //   // })
  //   // let config = {
  //   //   // crossdomain: true,
  //   //   // headers: {
  //   //   //   // 'Content-Type': 'multipart/form-data',
  //   //   //   // 'Accept': 'application/json'
  //   //   // },
  //   //   // responseType: 'blob'
  //   //   headers: {
  //   //     'Accept': '*/*',
  //   //     'Access-Control-Allow-Origin': '*',
  //   //     'Content-Type': 'image/jpeg',
  //   //     'x-amz-acl': 'public-read'
  //   //     // 'Access-Control-Allow-Methods': 'GET, HEAD, POST',
  //   //     // 'Access-Control-Max-Age': 10000
  //   //   }
  //   // }
  //   try {
  //     // console.log('--download 1')
  //     let ext = FileHelper.getPathExt(url)
  //     if (enforceType && enforceType.length > 0) {
  //       ext = enforceType
  //     }
  //     const type = FileHelper.getMime(ext || '')
  //     if (!ext || ext.length <= 0 || !type || type.length <= 0) {
  //       throw new Error(`invalid extension or mime type: ${ext}/${type}`)
  //     }
  //     // console.log('-- file type: ' + ext, type)
  //     const config = {
  //       headers: {
  //         'Accept': type,
  //       },
  //       responseType: 'blob',
  //     } as AxiosRequestConfig
  //     if (/* type.indexOf('image') >= 0 */url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0) {
  //       url += `?d=${StringHelper.random()}`
  //     }
  //     // console.log('--download 2')
  //     const response = await axios.get(url, config)
  //     if (!response) {
  //       throw new Error('invalid response')
  //     }
  //     // console.log('--download 3')
  //     const blob = new Blob([response.data], { type })
  //     const link = document.createElement('a')
  //     // link.crossOrigin = 'anonymous' // CORS fix 1 *
  //     link.href = URL.createObjectURL(blob)
  //     link.download = FileHelper.getPathFilename(url) || `download.${ext}`
  //     link.click()
  //     URL.revokeObjectURL(link.href)
  //     // console.log('--download 4')
  //   } catch (error) {
  //     window.open(url, '_blank')
  //     throw error
  //   }
  // }

  // helper functions: mui-file-input
  // ref:

  static getTotalFilesSize(files: File[]): number {
    return files.reduce((previousValue, currentFile) => {
      return previousValue + currentFile.size
    }, 0)
  }

  static matchIsFile(value: unknown): value is File {
    // Secure SSR
    return typeof window !== "undefined" && value instanceof File
  }

  static fileListToArray(filelist: FileList): File[] {
    return Array.from(filelist)
  }

  static getFileDetails(value: File | File[]) {
    const name = FileHelper.matchIsFile(value)
      ? value.name
      : value[0]?.name || ""
    const parts = name.split(".")
    const extension = parts.pop() as string
    const filenameWithoutExtension = parts.join(".")

    return {
      filename: filenameWithoutExtension,
      extension,
    }
  }

  static matchIsNonEmptyArray<T>(array: T[]): array is [T, ...T[]] {
    return array.length > 0
  }
}

export default FileHelper
