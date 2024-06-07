"use client"

import _ from "lodash"
import { useState, useRef, useMemo, useCallback } from "react"
import { useAppStore } from "@/store/app-provider"
import type {
  FormAttrInfo /* , KeyInfo */,
} from "@/components/form/forminterface"

import FormConstants from "@/components/form/formconstants"
import CommonUtil from "@/utils/common"
const ErrorConst = FormConstants.Error
import PageConstants from "@/app/admin/page/_sub/constants"

import BasePage from "@/components/sub/page"
import BaseForm from "@/components/form/form"
import BaseButton from "@/components/sub/button"

import PageMenu from "@/app/admin/page/_sub/menu"

const AdminPage = () => {
  const { setLoading } = useAppStore((state: any) => state)

  const [selected, setSelected] = useState(undefined)
  const currItem = useMemo(() => {
    let items = _.flatMap(
      PageConstants.ITEMS_MENU,
      (item: Record<string, any>) => {
        if (item.hasOwnProperty("subs")) {
          return ([item] as Record<string, any>[]).concat(item.subs)
        }
        return item
      },
    )
    return _.find(items, (item) => item.value === selected) || {}
  }, [selected])

  // form
  const formRef = useRef(null)
  const formDefaults = /* FormUtil.getDefaults(keyinfos) || */ {} as Record<
    string,
    any
  >
  const [form, setForm] = useState(formDefaults)
  const [formInfo] = useState({
    // dataGenders: [] as FormSelectInfo[],
  })
  const [formRules] = useState({
    name: [{ required: true, message: ErrorConst.REQUIRED }],
    password: [{ required: true, message: ErrorConst.REQUIRED }],
  })

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
      // const response = await fetch('/api/aims/auth/login', {
      //   method: 'POST',
      //   body: JSON.stringify(form),
      // })
      // const data = await (response?.json?.()) || {}
      // console.log('login: response data', data)
      // router.push('/admin/dashboard')
      await CommonUtil.timeout(1000)
      setLoading(false)
      // return response
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
  }, [
    // router,
    form,
    setLoading,
  ])

  return (
    <BasePage className="w-full min-h-[50vw]">
      <div className="w-full p-4 pt-8">
        <h1 className="text-xl">Pages</h1>
      </div>
      <div className="w-full flex theme-light">
        <PageMenu selected={selected} setSelected={setSelected} />
        <div className="w-full bg-white">
          {currItem.label != null ? (
            <div className="w-full p-2 py-4">
              {currItem.label || ""}
              {currItem.value ? ` (name: ${currItem.value})` : ""}
            </div>
          ) : null}
          {currItem.attrs != null ? (
            <div className="p-4 pr-0 bg-slate-100 rounded-b text-black">
              <BaseForm
                ref={formRef}
                attrs={currItem.attrs}
                setAttrs={() => {}}
                data={form}
                setDataById={(id: string, value: any) => {
                  setForm((prev) => {
                    return { ...prev, [id]: value }
                  })
                }}
                info={formInfo}
                rules={formRules}
                onInput={onFormInput}
                onChange={onFormChange}
                className="mb-4"
              />
              <BaseButton className="theme-dark button mb-4" onClick={onSubmit}>
                Submit
              </BaseButton>
            </div>
          ) : null}
        </div>
      </div>
    </BasePage>
  )
}

export default AdminPage
