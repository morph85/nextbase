'use client'

import React, {useEffect, useRef, useCallback} from "react"
import Box from "@mui/material/Box"

import AOS from "aos"
import "aos/dist/aos.css"

// import clsx from "clsx"
import { COLOR_DARK } from "@/app/theme"

const OFFSET_TOP = 200

function ScrollTop (props: any) {
  // const _isDark = useRef(true)
  // useEffect(() => {
  //   _isDark.current = props.isDark
  // }, [props.isDark])

  const isTopUp = useRef(true)
  const onGoTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const onScroll = useCallback(() => {
    const scrollY = window.scrollY
    isTopUp.current = (scrollY > OFFSET_TOP)
  }, [])
  useEffect(() => {
    AOS.init()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [
    onScroll,
  ])

  return (
    <Box className="go-top-wrapper" sx={styles.wrapper}>
      <Box className={`go-top is-cursor ${!isTopUp ? 'aos-animate' : ''}`}
        sx={{
          ...styles.inner,
          // ...(_isDark ? {} : styles.innerBright),
        }}
        onClick={onGoTop}
        data-aos="slide-up"
        data-aos-duration="1300">
        ↑
      </Box>
    </Box>
  )
}

export default ScrollTop

const styles = {
  wrapper: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    overflow: 'hidden',
    ['&:hover']: {
      cursor: 'pointer',
    },
  },

  inner: {
    display: 'block',
    width: '50px',
    height: '50px',
    backgroundColor: COLOR_DARK,
    color: 'white',
    border: '0.1pt solid #666',
    padding: '12px',
    paddingTop: '8px',
    textAlign: 'center',
  },

  // innerBright: {
  //   backgroundColor: COLOR_BRIGHT,
  // },
}