// import { useState } from "react"
import { FormAttrInfo } from "./forminterface"

import TextField from '@mui/material/TextField'
// import OutlinedInput from "@mui/material/OutlinedInput"
// import { FormHelperText } from '@mui/material'

// import IconButton from "@mui/material/IconButton"
// import Visibility from "@mui/icons-material/Visibility"
// import VisibilityOff from "@mui/icons-material/VisibilityOff"
// import InputAdornment from "@mui/material/InputAdornment"

type Props = {
  attr: FormAttrInfo
  data: Record<string, any>
  setDataById: Function
  info: Record<string, any>
  // methods
  onInput?: Function
}

const FormInput = (props: Props) => {
  const {
    attr,
    data,
    setDataById,
    info,
    onInput,
  } = props

  const _onInput = (event: any) => {
    const value = event?.target?.value
    setDataById(attr.id, value)
    if (onInput) {
      onInput(value, attr, data, info)
    }
  }

  // const [show, setShow] = useState(false)
  // const onShowPassword = () => setShow((show) => !show)

  // const onPreventDefault = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault()
  // }

  // const getEndAdornment = (attr: FormAttrInfo) => {
  //   switch (attr.inputType) {
  //     case "password":
  //       return (
  //         <InputAdornment position="end">
  //           <IconButton
  //             aria-label="toggle password visibility"
  //             onClick={onShowPassword}
  //             onMouseDown={onPreventDefault}
  //             edge="end"
  //           >
  //             {show ? <VisibilityOff /> : <Visibility />}
  //           </IconButton>
  //         </InputAdornment>
  //       )
  //     default:
  //       break
  //   }
  //   return null
  // }

  return (
    <TextField
      id={attr.id}
      defaultValue={data[attr.id]}
      label={attr.label}
      type={attr.inputType}
      // type={
      //   attr.inputType === "password"
      //     ? show
      //       ? "text"
      //       : "password"
      //     : attr.inputType
      // }
      onInput={_onInput}
      // endAdornment={getEndAdornment(attr)}
      error={attr.error != null && attr.error?.length > 0}
      multiline={attr.hasOwnProperty('multiline') ? attr.multiline : false}
      minRows={attr.hasOwnProperty('minRows') ? attr.minRows : undefined}
      {...(attr.inputType === 'date') ? { InputLabelProps: { shrink: true } } : {}}
    />
    // <OutlinedInput
    //   id={attr.id}
    //   defaultValue={data[attr.id]}
    //   label={attr.label}
    //   type={
    //     attr.inputType === "password"
    //       ? show
    //         ? "text"
    //         : "password"
    //       : attr.inputType
    //   }
    //   onInput={_onInput}
    //   endAdornment={getEndAdornment(attr)}
    //   error={attr.error != null && attr.error?.length > 0}
    //   multiline={attr.hasOwnProperty('multiline') ? attr.multiline : false}
    //   minRows={attr.hasOwnProperty('minRows') ? attr.minRows : undefined}
    //   color={"secondary"}
    // ></OutlinedInput>
  )
}

export default FormInput
