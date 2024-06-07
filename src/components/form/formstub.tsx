import _ from "lodash"

import { useState, useEffect } from "react"
import { FormAttrInfo } from "./forminterface"

import CommonUtil from "@/utils/common"

type Props = {
  attr: FormAttrInfo
  data: Record<string, any>
  setDataById: Function
  info: Record<string, any>
  onChange?: Function
}

const FormStub = (props: Props) => {
  const {
    // attr,
    data,
    // setDataById,
    // info,
    // methods
    // onChange,
  } = props

  // hack refresh: to-fix
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const init = async () => {
      setVisible(false)
      await CommonUtil.timeout(1)
      setVisible((prev) => true)
    }
    init()
  }, [data])

  // const _onChange = (event: any) => {
  //   const value = event?.target?.value
  //   setDataById(attr.id, value)
  //   if (onChange) {
  //     onChange(value, attr, data, info)
  //   }
  // }

  if (!visible) return null
  return <div className="w-full">(Invalid Control)</div>
}

export default FormStub
