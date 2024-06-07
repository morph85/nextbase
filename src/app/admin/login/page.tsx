"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"

import type { FormAttrInfo, KeyInfo } from "@/components/form/forminterface"

import _ from "lodash"
import FormConstants from "@/components/form/formconstants"
import FormUtil from "@/components/form/formutil"
// import CommonUtil from '@/utils/common'
const ErrorConst = FormConstants.Error

import { useAppStore } from "@/store/app-provider"

import BasePage from "@/components/sub/page"
import BaseForm from "@/components/form/form"
import BaseButton from "@/components/sub/button"

const keyinfos: KeyInfo[] = [
  { key: "email", vtype: "string", default: undefined },
  { key: "password", vtype: "string", default: undefined },
]

const PageLogin = (props: any) => {
  const router = useRouter()

  const formRef = useRef(null)
  const formDefaults = (FormUtil.getDefaults(keyinfos) || {}) as Record<
    string,
    any
  >
  const [form, setForm] = useState(formDefaults)
  const { setLoading } = useAppStore((state: any) => state)

  const [attrs, setAttrs] = useState([
    {
      id: "email",
      label: "User",
      type: "input",
      controlSx: { width: { xs: "100%", sm: "100%" } },
    },
    {
      id: "password",
      label: "Password",
      type: "input",
      inputType: "password",
      controlSx: { width: { xs: "100%", sm: "100%" } },
    },
  ] as FormAttrInfo[])

  const [info] = useState({
    // dataGenders: [] as FormSelectInfo[],
  })

  const [rules] = useState({
    name: [{ required: true, message: ErrorConst.REQUIRED }],
    password: [{ required: true, message: ErrorConst.REQUIRED }],
  })

  const getData = useCallback(
    async () => {
      // await CommonUtil.timeout(800)
      let response: any = {
        status: "success",
        data: {
          email: "ivan@adaptconcepts.com",
          password: "abc12345",
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

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      let promises = []
      let promise
      promise = getData()
      promises.push(promise)
      await Promise.all(promises)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
    }
  }, [setLoading, getData])

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

  const onSubmit = useCallback(async () => {
    let ref = formRef.current as any
    try {
      setLoading(true)
      ref.validate()
      console.log("login: request data", form)
      const response = await fetch("/api/aims/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      })
      const data = (await response?.json?.()) || {}
      console.log("login: response data", data)
      router.push("/admin/dashboard")
      setLoading(false)
      return response
    } catch (error: any) {
      setLoading(false)
      // console.error('validate failed', error)
      console.error("validate failed cause", error.cause)
    }
    // for (let a in attrs) {
    //   let attr = attrs[a]
    //   attr.error = 'Some Error.'
    // }
    // setAttrs(([] as any).concat(attrs))
  }, [router, form, setLoading])

  // const onClear = useCallback(() => {
  //   let ref = formRef.current as any
  //   try {
  //     ref.resetFields()
  //   } catch (error: any) {
  //     // console.error('validate failed', error)
  //     console.error('validate failed cause', error.cause)
  //   }
  // }, [])

  return (
    <BasePage className="w-full min-h-[50vw] py-16" center="true">
      <div className={"w-auto min-w-[400px"}>
        <div className="w-full pb-2">
          <div className="p-4 bg-slate-100 rounded text-black">Admin Login</div>
        </div>
        <div className="p-4 pr-0 bg-slate-100 rounded text-black">
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
          {/* <BaseButton className="button mb-4 ml-4"
            color={"hilldark"}
            onClick={onClear}>
            Clear Validate
          </BaseButton> */}
        </div>
      </div>
    </BasePage>
  )
}

export default PageLogin
