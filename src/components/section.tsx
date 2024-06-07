"use client"

/**
 * Default className is `w-full p-4 pt-[80px]`.
 *
 * Default innerClassName is `w-full container mx-auto`.
 *
 * Provided values to `className` and `innerClassName`
 * will be appended to the default values.
 */
import React, {useRef, useState, useEffect} from "react"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"

import { useAppStore } from "@/store/app-provider"

export const DEFAULT_HOOK_INFO = { x: -1, y: -1, width: -1, height: -1 }

const Section = (props: SectionProps, ref: any) => {
  const { clientWidth/* , clientHeight */ } = useAppStore((state: any) => state)
  const isDesktop = (clientWidth >= 768)

  let className = `transition-all duration-500 w-full ${isDesktop ? "p-4" : ""} `
  let innerClassName = (props.isFull ? "w-full mx-auto " : "w-full mx-auto container ")

  if (props.className) className += props.className
  if (props.innerClassName) innerClassName += props.innerClassName

  if (props.isDarkBg) className += " theme-dark"

  const hookRef: any = useRef(null)
  const [_hookInfo, setHookInfo] = useState({ x: -1, y: -1, width: -1, height: -1 })
  const _propSetHookInfo = props.setHookInfo
  const _propSetInitialHookInfo = props.setInitialHookInfo
  
  useScrollPosition(({ currPos }) => {
    const element = hookRef.current
    const {width, height} = element?.getBoundingClientRect()
    const info = { ...currPos, width, height }
    setHookInfo(info)
    props.setHookInfo?.(info)
  }, [], hookRef)

  useEffect(() => {
    const element = hookRef.current
    const {x, y, width, height} = element?.getBoundingClientRect()
    const info = {x, y, width, height}
    setHookInfo(info)
    _propSetHookInfo?.(info)
    _propSetInitialHookInfo?.(info)
  }, [
    _propSetHookInfo,
    _propSetInitialHookInfo,
  ])

  return (
    <div ref={hookRef} className={className}>
      <div className={innerClassName}>{props.children}</div>
    </div>
  )
}

export default Section

type SectionProps = {
  className?: string
  innerClassName?: string
  isDarkBg?: boolean
  isFull?: boolean
  children: React.ReactNode
  setHookInfo?: Function
  setInitialHookInfo?: Function
}
