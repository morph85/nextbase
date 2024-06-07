import _ from "lodash"

import { useState, useMemo, useEffect } from "react"
import { FormAttrInfo, FormSelectInfo } from "./forminterface"

import CommonUtil from "@/utils/common"

// import Select from "@mui/material/Select"
// import MenuItem from "@mui/material/MenuItem"

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

type Props = {
  attr: FormAttrInfo
  data: Record<string, any>
  setDataById: Function
  info: Record<string, any>
  onChange?: Function
}

const FormRadio = (props: Props) => {
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

  const _options = useMemo(() => {
    const options = attr.options
    if (typeof options === "object" && Array.isArray(options)) {
      return options
    }
    if (typeof options === "string") {
      const dataOptions = info[options] || []
      return dataOptions
    }
    return []
  }, [attr, info])

  const _onChange = (event: any) => {
    const value = event?.target?.value
    setDataById(attr.id, value)
    if (onChange) {
      onChange(value, attr, data, info)
    }
  }

  if (!visible) return null
  return (
    <RadioGroup
      aria-labelledby={attr.id}
      id={attr.id}
      defaultValue={data[attr.id] ?? ""}
      onChange={_onChange}
      row={attr.hasOwnProperty('row') ? attr.row : true}
    >
      {_.map(_options, (option: FormSelectInfo, oIndex: number) => {
        return (
          <FormControlLabel 
            value={option.value}
            key={`${oIndex}`}
            control={<Radio />}
            label={option.label}>
          </FormControlLabel>
        )
      })}
    </RadioGroup>
  )
}

export default FormRadio
