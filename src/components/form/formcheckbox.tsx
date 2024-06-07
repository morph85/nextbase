import _ from "lodash"

import { useState, useEffect } from "react"
import { FormAttrInfo } from "./forminterface"

import CommonUtil from "@/utils/common"

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

type Props = {
  attr: FormAttrInfo
  data: Record<string, any>
  setDataById: Function
  info: Record<string, any>
  onChange?: Function
}

const FormCheckbox = (props: Props) => {
  const {
    attr,
    data,
    setDataById,
    info,
    // methods
    onChange,
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

  const _onChange = (event: any) => {
    const value = event?.target?.checked
    setDataById(attr.id, value)
    if (onChange) {
      onChange(value, attr, data, info)
    }
  }

  if (!visible) return null
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={data[attr.id]}
          onChange={_onChange}
          name={attr.id}
        />
      }
      label={attr.label}
      labelPlacement="end"
    />
  )
}

export default FormCheckbox
