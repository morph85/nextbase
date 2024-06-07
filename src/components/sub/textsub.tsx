import { ReactNode } from "react"

type TextSubProps = {
  title: string | ReactNode
  desc: string
  children?: ReactNode
}

const TextSub = (props: TextSubProps) => {
  const { title, desc, children } = props

  return (
    <div className="py-4">
      <h1 className="text-5xl font-semibold">{title}</h1>
      <div className="pt-8 block">
        {desc}
        {children}
      </div>
    </div>
  )
}

export default TextSub
