import { SxProps, Theme } from "@mui/material"

export interface FormSelectInfo {
  value: string | number
  label: string
}

export interface FormAttrInfo {
  id: string
  type: string
  label?: string
  options?: string | FormSelectInfo[]
  // meta
  controlClassName?: string
  controlSx?: SxProps<Theme>
  // error
  error?: undefined | string
  // type: input / text field
  inputType?: string
  multiline?: boolean
  minRows?: number
  // type: radio
  row?: boolean
}

export declare type ValidatorFunction = (
  rule: FormRule,
  value: any,
  callback: Function,
) => void

export interface FormRule {
  message: string // message (rule: FormRule, value: any)
  required?: boolean
  validator?: ValidatorFunction // validator (rule: FormRule, value: any, callback: Function = () => {})
}

export declare type FormRules = Record<string, FormRule[]>

export interface KeyInfo {
  key: string
  vtype?: string // default = any
  default?: any
  source?: string
  alias?: string
  // boolean
  forceBool?: Boolean
  boolToFormInt?: Boolean
  // int string
  isEmptyNull?: Boolean // for use when input become '', change to null (parseForm)
  isIntNanString?: Boolean
  // date
  dateFormatter?: Function
  // array
  subkey?: string
  idKey?: string
  arrayKeyInfos?: Array<KeyInfo>
  arraySave?: Function
  arrayLoad?: Function
  // load/save/omit
  loadFrom?: Function
  saveTo?: Function
  omit?: Boolean
}
