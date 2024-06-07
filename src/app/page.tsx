"use client"

import React, {useEffect, useState, useRef, useMemo} from "react"
import _ from "lodash"

import { useAppStore } from "@/store/app-provider"

// import Button from "@/components/sub/button"
import Image from "@/components/sub/image"
import ScrollTop from "@/components/sub/scrolltop"

// import Carousel, { ResponsiveType } from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

// import MarqueeText from "react-marquee-text"
// import "./marqueeText.css"

import AOS from "aos"
import "aos/dist/aos.css"

import Section, { DEFAULT_HOOK_INFO as DEF_INFO } from "@/components/section"
// import clsx from "clsx"

// import Link from "next/link"

export default function Home() {
  const { clientWidth, clientHeight } = useAppStore((state: any) => state)
  const isDesktop = (clientWidth >= 768)
  const isDesktopHD = (clientWidth >= 1024)
  
  useEffect(() => {
    AOS.init()
  }, [])

  const SectionCarousel = ({ setHook, hookInfo, isDark }: any) => {
    const sectionRef:any = useRef(null)

    const hookPercent = useMemo(() => {
      if (hookInfo.y === -1 || clientHeight === -1) return 0
      const hookPct = (hookInfo.y / clientHeight * 100)
      // const OFFSET_PCT = 30 // 30%
      // if (hookPct >= -OFFSET_PCT && hookPct <= OFFSET_PCT) {
      //   return hookPct
      // }
      return hookPct
    }, [
      hookInfo,
    ])
  
    // NOTE: Making the first section to be full height of the viewport.
    useEffect(() => {
      // const navbar = document.querySelector('.header')
      // const height:number = navbar!.clientHeight
      
      // let resultHeight = `calc(100vh - calc(${height}px + 80px))`
      // sectionRef.current.style.height = resultHeight
      // sectionRef.current.style.backgroundImage = 'url("/images/home-1.png")'

      // const { innerWidth } = window
      // sectionRef.current.style.backgroundPosition = innerWidth >= 1024 ? '75% 100%' : '0% 100%'
    }, [])
    
    const [initialHookInfo, setInitialHookInfo] = useState(_.cloneDeep(DEF_INFO))
  
    return (
      <Section isDarkBg={isDark} isFull={false} className="pb-0 mt-[40px] md:mt-[80px]" setHookInfo={setHook} setInitialHookInfo={setInitialHookInfo}>
        {/** NOTE: The following css positioning breaks down if below 1025px. */}
        <div ref={sectionRef}
          className="flex flex-col lg:flex-row justify-start lg:justify-end bg-bottom bg-no-repeat bg-cover"
          style={{
            // backgroundColor: clientWidth >= 1024 ? 'red' : 'blue',
            // backgroundPosition: clientWidth >= 1024 ? '75% 100%' : '0% 100%',
            // backgroundSize: 'cover',
            // height: 'calc(100vh - 60.8px)',
            ...(isDesktopHD ? {
              height: 'calc(100vh - 60.8px)',
              backgroundImage: 'url("/images/banner-main.webp")',
              backgroundSize: 'cover',
              backgroundPositionX: '50%',
              backgroundPositionY: (-hookPercent * 10) + 70 - (clientWidth >= 1550 ? clientWidth - 1550 : (-clientHeight * 0.8 + 730)) * 0.5,
              // backgroundPositionY: (-hookPercent * 10) + clientHeight * 0.5 - 400,
            } :
            isDesktop ? {
              height: 'calc(100vh - 60.8px + 100px)',
              backgroundImage: 'url("/images/banner-main.webp")',
              backgroundSize: 'cover',
              backgroundPositionX: '15%',
              backgroundPositionY: '100%',
            } : {
              height: 'auto',
              backgroundImage: 'none',
              backgroundSize: 'contain',
              backgroundPositionX: '35%',
              backgroundPositionY: '100%',
            }),
            // backgroundPositionX: 100,
          }}>
          <div className="flex flex-col justify-center w-full">
            <div className="container m-auto px-12 md:px-8 py-8 md:py-8 pb-0 md:pb-0 flex flex-col md:flex-row"
              data-aos="fade-up" data-aos-once="true">
              <div className="w-full lg:w-1/2 xl:w-3/5 hidden lg:block">
                <div className="hidden">
                  {`wwidth: ${clientWidth}, x: ${hookInfo.x}, y: ${hookInfo.y}, h: ${hookInfo.height}, pct: ${hookPercent}, iy: ${initialHookInfo.y}`}
                </div>
              </div>
              <div className="w-full lg:w-1/2 xl:w-2/5 pr-0 md:pr-8">
                <h1 className="text-5xl font-bold mb-8 md:mb-4">
                  Stress Transformed by the Renewal of Your Mind, Body, and Soul
                </h1>
                <p>
                  Greatly improve the overall quality of your life through our
                  holistic and integrative methodologies, products and services.
                  Reverse or prevent avoidable metabolic dysfunction and live your
                  life to the fullest potential.
                </p>
              </div>
            </div>
            <div className="w-full md:hidden relative overflow-hidden mt-16">
              <Image
                src="/images/banner-main.webp"
                alt="stress transformed"
                styleWidth="100%"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </Section>
    )
  }

  const [hookCarousel, setHookCarousel] = useState(_.cloneDeep(DEF_INFO))

  const hookIsDark = useMemo(() => {
    if (clientHeight === -1) return false // default
    // const OFFSET_Y_PERCENT = 30.0 // 30%
    // const MAIN_HEIGHT = clientHeight
    let isDark = false
    // if ((hookCarousel.y / MAIN_HEIGHT * 100) < OFFSET_Y_PERCENT) {
    //   index = 0
    // }
    return isDark
  }, [
    clientHeight,
    // hookCarousel,
  ])

  return (
    <div className="w-full relative">
      <div className="bg-slate-100 fixed top-0 right-0 hidden">
        <div>{`winWidth=${clientWidth}, winHeight=${clientHeight}`}</div>
        <div>{`x=${hookCarousel.x}, y=${hookCarousel.y}, pc=${hookCarousel.y/clientHeight*100}`}</div>
        <div>{`index = ${hookIsDark ? 'DARK' : 'LIGHT'}`}</div>
      </div>
      {SectionCarousel({ hookInfo: hookCarousel, setHook: setHookCarousel, isDark: hookIsDark })}
      <ScrollTop />
    </div>
  )
}