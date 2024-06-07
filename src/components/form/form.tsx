import _ from "lodash"

import { forwardRef, useImperativeHandle } from "react"
import Box from "@mui/material/Box"

import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"

import type { FormAttrInfo, FormRules } from "./forminterface"

import FormInput from "./forminput"
import FormSelect from "./formselect"
import FormCheckbox from "./formcheckbox"
import FormRadio from "./formradio"
import FormTipTap from "./formtiptap"
import FormUpload from "./formupload"
import FormStub from "./formstub"

type Props = {
  // attr
  attrs: FormAttrInfo[]
  setAttrs: Function
  // data
  data: Record<string, any>
  setDataById: Function
  // info & rules
  info: Record<string, any>
  rules: FormRules
  className?: string
  // methods
  onInput?: Function
  onChange?: Function
}

const Form = forwardRef((props: Props, ref: any) => {
  const {
    attrs,
    setAttrs,
    data,
    setDataById,
    info,
    rules,
    // methods
    onInput,
    onChange,
    className,
  } = props

  const renderControl = (attr: FormAttrInfo) => {
    switch (attr.type) {
      case "input":
        return (
          <FormInput
            attr={attr}
            data={data}
            setDataById={setDataById}
            info={info}
            onInput={onInput}
          />
        )
      case "select":
        return (
          <FormSelect
            attr={attr}
            data={data}
            setDataById={setDataById}
            info={info}
            onChange={onChange}
          />
        )
      case "checkbox":
        return (
          <FormCheckbox
            attr={attr}
            data={data}
            setDataById={setDataById}
            info={info}
            onChange={onChange}
          />
        )
      case "radio":
        return (
          <FormRadio
            attr={attr}
            data={data}
            setDataById={setDataById}
            info={info}
            onChange={onChange}
          />
        )
      case "tiptap":
        return (
          <FormTipTap
            attr={attr}
            data={data}
            setDataById={setDataById}
            info={info}
            onChange={onChange}
          />
        )
      case "upload":
        return (
          <FormUpload
            attr={attr}
            data={data}
            setDataById={setDataById}
            info={info}
            onChange={onChange}
          />
        )
      default:
        break
    }
    return (
      <FormStub
        attr={attr}
        data={data}
        setDataById={setDataById}
        info={info}
        onChange={onChange}
      />
    )
  }

  const isRequired = (attr: FormAttrInfo) => {
    let id = attr.id
    let rulesets = rules?.[id] || []
    for (let r in rulesets) {
      let ruleset = rulesets[r]
      if (ruleset?.required === true) return true
    }
    return false
  }

  const getFormControlSx = (attr: FormAttrInfo) => {
    const SX_DEFAULT = {
      pl: 0,
      pr: 2,
      width: { xs: "100%", sm: "25%" },
    }
    const attrSx = attr.controlSx || {}
    switch (attr.type) {
      case "input":
        break
      case "select":
        return {
          ...SX_DEFAULT,
          minWidth: 120,
          ...attrSx,
        }
      default:
        break
    }
    return {
      ...SX_DEFAULT,
      ...attrSx,
    }
  }

  const resetField = (id: string) => {
    for (let a in attrs) {
      let attr = attrs[a]
      if (attr.id === id) {
        attr.error = undefined
      }
    }
    setAttrs(([] as any).concat(attrs))
  }

  const resetFields = () => {
    for (let a in attrs) {
      let attr = attrs[a]
      attr.error = undefined
    }
    setAttrs(([] as any).concat(attrs))
  }

  const validate = () => {
    resetFields()

    let errorsall: Record<string, any> = {}
    for (let a in attrs) {
      let attr = attrs[a]
      let id = attr.id
      let value = data[id]

      // storing errors based on array of rules
      let errors = []
      let rulesets = rules[id]
      for (let r in rulesets) {
        let rule = rulesets[r]
        let message = rule.message
        let validator = rule.validator

        // if blank/required
        let isBlank = value == null || `${value}`.length <= 0
        if (rule.required && isBlank) {
          errors.push(message)
        }

        // by validator
        if (validator && typeof validator === "function") {
          validator(rule, value, (ret: undefined | Error) => {
            if (ret instanceof Error) {
              errors.push((ret && ret.message) || message)
            }
          })
        }

        // set
        if (errors.length > 0) {
          errorsall[id] = errors
        }
      }
    }

    // compound attrs validation by key: 'form'
    if (rules.hasOwnProperty("form")) {
      let rulesets = rules.form
      for (let r in rulesets) {
        let rule = rulesets[r]
        let message = rule.message
        let validator = rule.validator

        // by validator (form)
        if (validator && typeof validator === "function") {
          validator(rule, data, (obj: any) => {
            if (typeof obj === "object" && !Array.isArray(obj)) {
              // assign own error by format:
              // {
              //   [attr.id]: new Error(rule?.message),
              //   [attr.id2]: new Error(rule?.message),
              // }
              for (let retkey in obj) {
                let ret = obj[retkey]
                if (ret && ret instanceof Error) {
                  if (!errorsall.hasOwnProperty(retkey)) {
                    errorsall[retkey] = []
                  }
                  errorsall[retkey].push((ret && ret.message) || message)
                }
              }
            }
          })
        }
      }
    }

    if (Object.keys(errorsall)?.length > 0) {
      // set attrs
      for (let akey in errorsall) {
        let errors = errorsall[akey]
        let attr = _.find(attrs, (item) => item.id === akey)
        if (attr) {
          attr.error =
            (errors != null && errors.length > 0 && errors.join(", ")) || ""
        }
      }
      setAttrs(([] as any).concat(attrs))

      // throw errors
      let error = new Error("validate_failed", { cause: errorsall })
      throw error
    }
  }

  useImperativeHandle(ref, () => ({
    resetField,
    resetFields,
    validate,
  }))

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { my: 1 },
      }}
      noValidate
      autoComplete="off"
      className={`${className || ""} relative`}
    >
      {_.map(attrs, (attr: FormAttrInfo, attrIndex) => {
        return (
          <FormControl
            key={`${attrIndex}`}
            sx={{
              ...getFormControlSx(attr),
            }}
            className={attr.controlClassName}
          >
            {
              (
                attr.type !== 'checkbox' &&
                attr.type !== 'input'
              ) ?
              <InputLabel htmlFor={attr.id} id={attr.id}>
                {attr.label}
                {isRequired(attr) ? <span className="text-red-600"> *</span> : ""}
              </InputLabel> : null
            }
            {
              renderControl(attr)
            }
            {
              attr.error != null && attr.error?.length > 0 ? (
                <FormHelperText
                  variant="standard"
                  error={attr.error != null && attr.error?.length > 0}>
                  {attr.error}
                </FormHelperText>
              ) : null
            }
          </FormControl>
        )
      })}
    </Box>
  )
})

Form.displayName = "BaseForm"

export default Form
