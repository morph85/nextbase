"use client"

import { useState, useEffect } from 'react'
import Box from "@mui/material/Box"
import Image from "next/image"
import ReactPlayer from "react-player/lazy"

import clsx from "clsx"
import styles from "@/components/sub/player.module.scss"

type Props = {
  url: string,
  thumbUrl?: string,
  style?: Object,
  isAutoplay?: boolean,
}

const BasePage = (props: Props) => {
  const {
    url,
    thumbUrl,
    style,
    isAutoplay,
  } = props

  const [isClient, setIsClient] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  useEffect(() => {
    setIsClient(true)
    if (isAutoplay) {
      setIsMuted(true)
      setIsPlaying(true)
    }
  }, [isAutoplay])

  return (
    isClient ?
    <Box className={clsx('react-player-wrapper', styles.reactPlayerWrapper)}>
      <ReactPlayer
        style={{
          width: '100%',
          ...(style || {}),
        }}
        url={url}
        controls={true}
        width={'100%'}
        height={'100%'}
        light={
          thumbUrl != null && `${thumbUrl}`.length > 0 ?
          <Image src={thumbUrl} alt='thumbnail' sizes="100vw" style={{width:'100%'}} /> : false
        }
        playing={isPlaying}
        muted={isMuted}
      />
    </Box> :
    <div style={{width: '100%', height: 'auto', minHeight: '400px'}}>
      &nbsp;
    </div>
  )
}

export default BasePage
