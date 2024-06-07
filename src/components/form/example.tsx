import { useState, useEffect, useRef, useCallback } from "react"
import type {
  FormAttrInfo,
  FormRule,
  FormSelectInfo,
  KeyInfo,
} from "@/components/form/forminterface"

import _ from "lodash"
import FormConstants, {
  REGEX_CONTAIN_SPACE,
} from "@/components/form/formconstants"
import FormUtil from "@/components/form/formutil"
import CommonUtil from "@/utils/common"
const ErrorConst = FormConstants.Error

import { useAppStore } from "@/store/app-provider"

import BaseForm from "@/components/form/form"
import BaseButton from "@/components/sub/button"

const keyinfos: KeyInfo[] = [
  { key: "name", vtype: "string", default: undefined },
  { key: "gender", vtype: "string", default: "" },
  { key: "user", vtype: "string", default: undefined },
  { key: "password", vtype: "string", default: undefined },
  { key: "repassword", vtype: "string", default: undefined },
]

const ExampleForm = (props: any) => {
  const formRef = useRef(null)
  const formDefaults = (FormUtil.getDefaults(keyinfos) || {}) as Record<
    string,
    any
  >
  const [form, setForm] = useState(formDefaults)
  const { setLoading } = useAppStore((state: any) => state)

  const [attrs, setAttrs] = useState([
    {
      id: "name",
      label: "Name",
      type: "input",
      controlSx: { width: { xs: "100%", sm: "100%" } },
    },
    {
      id: "gender",
      label: "Gender",
      type: "select",
      options: "dataGenders",
    },
    {
      id: "user",
      label: "User",
      type: "input",
      controlSx: { width: { xs: "100%", sm: "100%" } },
    },
    {
      id: "password",
      label: "Password",
      type: "input",
      inputType: "password",
      controlSx: { width: { xs: "100%", sm: "50%" } },
    },
    {
      id: "repassword",
      label: "Retype Password",
      type: "input",
      inputType: "password",
      controlSx: { width: { xs: "100%", sm: "50%" } },
    },
    {
      id: "upload",
      label: "Upload",
      type: "upload",
      controlSx: { width: { xs: "100%", sm: "100%" } },
    },
  ] as FormAttrInfo[])

  const [info, setInfo] = useState({
    dataGenders: [] as FormSelectInfo[],
  })

  const validatorNoSpace = (rule: FormRule, value: any, callback: Function) => {
    if (value == null || `${value}`.length <= 0) {
      callback()
      return
    }
    if (REGEX_CONTAIN_SPACE.test(value)) {
      callback(new Error(rule.message))
      return
    }
    callback()
  }

  const validatorPasswordNotMatch = (
    rule: FormRule,
    data: Record<string, any>,
    callback: Function,
  ) => {
    let password = data?.password
    let repassword = data?.repassword
    if (
      password == null ||
      `${password}`.length <= 0 ||
      repassword == null ||
      `${repassword}`.length <= 0
    ) {
      callback()
      return
    }
    if (password !== repassword) {
      callback({
        password: new Error(rule.message),
        repassword: new Error(rule.message),
      })
      return
    }
    callback()
  }

  const [rules] = useState({
    gender: [{ required: true, message: ErrorConst.REQUIRED }],
    password: [
      { required: true, message: ErrorConst.REQUIRED },
      { message: ErrorConst.NO_SPACE, validator: validatorNoSpace },
    ],
    repassword: [
      { required: true, message: ErrorConst.REQUIRED },
      { message: ErrorConst.NO_SPACE, validator: validatorNoSpace },
    ],
    form: [
      {
        message: ErrorConst.PASSWORD_NOT_MATCH,
        validator: validatorPasswordNotMatch,
      },
    ],
  })

  const getData = useCallback(
    async () => {
      await CommonUtil.timeout(800)
      let response: any = {
        status: "success",
        data: {
          name: "abc",
          // gender: 'm',
          user: "def",
          password: "123",
          repassword: "456",
        },
      }
      let data = response?.data || {}
      data = FormUtil.parseData(keyinfos, data)
      setForm((prev) => {
        return { ...prev, ...data }
      })
      // setForm((prev) => { return { ...prev, ...data } })
    },
    [
      // form,
    ],
  )

  const getGenders = useCallback(async () => {
    await CommonUtil.timeout(500)
    const genders: FormSelectInfo[] = [
      {
        value: "m",
        label: "Male",
      },
      {
        value: "f",
        label: "Female",
      },
    ]
    // info.dataGenders.splice(0, info.dataGenders.length, ...genders)
    setInfo((prev) => {
      return {
        ...prev,
        dataGenders: genders,
      }
    })
  }, [])

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      await getGenders()
      let promises = []
      let promise
      promise = getData()
      promises.push(promise)
      await Promise.all(promises)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
    }
  }, [setLoading, getData, getGenders])

  useEffect(() => {
    refresh()
  }, [refresh])

  useEffect(() => {
    console.log("page: form effect", form)
  }, [form])

  // form methods

  const onFormInput = useCallback((value: any, attr: FormAttrInfo) => {
    // console.log('page: form input', value)
  }, [])

  const onFormChange = useCallback((value: any, attr: FormAttrInfo) => {
    // console.log('page: form change', value)
  }, [])

  const onSubmit = useCallback(() => {
    let ref = formRef.current as any
    try {
      ref.validate()
    } catch (error: any) {
      // console.error('validate failed', error)
      console.error("validate failed cause", error.cause)
    }
    // for (let a in attrs) {
    //   let attr = attrs[a]
    //   attr.error = 'Some Error.'
    // }
    // setAttrs(([] as any).concat(attrs))
  }, [])

  const onClear = useCallback(() => {
    let ref = formRef.current as any
    try {
      ref.resetFields()
    } catch (error: any) {
      // console.error('validate failed', error)
      console.error("validate failed cause", error.cause)
    }
  }, [])

  return (
    <div className={`w-full ${props.className || ""}`}>
      <BaseForm
        ref={formRef}
        attrs={attrs}
        setAttrs={setAttrs}
        data={form}
        setDataById={(id: string, value: any) => {
          setForm((prev) => {
            return { ...prev, [id]: value }
          })
        }}
        info={info}
        rules={rules}
        onInput={onFormInput}
        onChange={onFormChange}
        className="mb-4"
      />
      <BaseButton className="theme-dark button mb-4" onClick={onSubmit}>
        Submit
      </BaseButton>
      <BaseButton
        className="button mb-4 ml-4"
        color={"hilldark"}
        onClick={onClear}
      >
        Clear Validate
      </BaseButton>
    </div>
  )
}

export default ExampleForm
