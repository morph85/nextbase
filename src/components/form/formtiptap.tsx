import _ from "lodash"

import { useEffect } from "react"
import { FormAttrInfo } from "./forminterface"

// import CommonUtil from '@/utils/common'
import TipTapEditor from "@/components/tiptap/editor"

type Props = {
  attr: FormAttrInfo
  data: Record<string, any>
  setDataById: Function
  info: Record<string, any>
  onChange?: Function
}

const FormTipTap = (props: Props) => {
  const {
    attr,
    data,
    setDataById,
    info,
    // methods
    onChange,
  } = props

  // hack refresh: to-fix
  // const [visible, setVisible] = useState(true)
  useEffect(() => {
    // const init = async () => {
    //   setVisible(false)
    //   await CommonUtil.timeout(1)
    //   setVisible((prev) => true)
    // }
    // init()
  }, [data])

  const _onChange = (value: any) => {
    // console.log('-- on change', value)
    // const value = event?.target?.value
    setDataById(attr.id, value)
    if (onChange) {
      onChange(value, attr, data, info)
    }
  }

  // if (!visible) return null
  return (
    <div className="w-full">
      <TipTapEditor
        value={data[attr.id]}
        onValueChange={_onChange}
        minHeight={"64px"}
      />
    </div>
  )
}

export default FormTipTap
