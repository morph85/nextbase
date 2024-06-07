"use client"

import React, { useEffect, useState, useCallback, useMemo } from "react"
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

import _ from "lodash"
import Link from "next/link"
// import Cookie from '@/store/cookie'
// import { cookies } from 'next/headers'
import CookieClient from "@/store/cookie-client"
import { useRouter, usePathname } from "next/navigation"
import { useAppStore } from "@/store/app-provider"

import NavConstants from "@/components/nav/constants"

// import { lato } from "@/app/fonts"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
// import IconButton from '@mui/material/IconButton'
import IconKeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import IconKeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'
import IconMenu from '@mui/icons-material/Menu'
import IconClose from '@mui/icons-material/Close'
// import IconShoppingBag from '@mui/icons-material/ShoppingBag'
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { popoverClasses } from "@mui/material/Popover"

// import Popover from "@mui/material/Popover"
// import Typography from "@mui/material/Typography"

import clsx from "clsx"
// import CssVariable from '@/app/variables.module.scss'
import styles from "@/components/nav/nav.module.scss"
import cstyles from "@/styles/common.module.scss"

function Nav() {
  const [_isHeader, setIsHeader] = useState(false)
  const scrollHeader = useCallback(() => {
    // if (window.scrollY >= 20) {
    //   setHeader(true)
    // } else {
    //   setHeader(false)
    // }
    setIsHeader(window.scrollY >= 100)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader)
    return () => {
      window.addEventListener("scroll", scrollHeader)
    }
  }, [
    scrollHeader,
  ])

  const router = useRouter()
  const { setLoading, setTheme } = useAppStore((state: any) => state)

  const pathname = usePathname()
  const isAdmin = useMemo(() => {
    return pathname?.startsWith?.("/admin")
  }, [pathname])

  const token = CookieClient.getToken()
  const isToken = token != null && token?.length > 0

  const [navItems, setNavItems] = useState([] as Record<string, any>[])
  const [navSubItems, setNavSubItems] = useState([] as Record<string, any>[])

  const [isExpand, setIsExpand] = useState(false)

  useEffect(() => {
    let items = isAdmin.valueOf()
      ? NavConstants.ITEMS_ADMIN
      : NavConstants.ITEMS_FE
    // navItems.splice(0, navItems.length, ...items)
    items = _.filter(items, (item: any) => {
      if (item.hasOwnProperty("reqToken") && item.reqToken) return isToken
      return true
    })
    items = _.map(items, (item: any) => {
      return {
        isExpand: false,
        ...item,
      }
    })
    setNavItems(items)
  }, [
    isAdmin,
    isToken,
    // navItems,
    pathname,
  ])

  const [anchorElPopover, setAnchorElPopover] =
    React.useState<HTMLElement | null>(null)
  const popoverOpen = Boolean(anchorElPopover)
  // const [buttonHovering, setButtonHovering] = React.useState(false)
  // const [popoverHovering, setPopoverHovering] = React.useState(false)
  const itemHovering = React.useRef(false)
  const popoverHovering = React.useRef(false)
  const id = popoverOpen ? "simple-popover" : undefined
  
  // popover solutions: https://stackoverflow.com/questions/55318477/how-to-make-material-ui-menu-based-on-hover-not-click (braza)
  // note: still with issue when point back to menu

  const onPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    // console.log('onPopoverOpen')
    if (anchorElPopover === event.currentTarget) {
      itemHovering.current = true
      return
    }
    const index = parseInt(String(event.currentTarget?.dataset?.index), 10)
    if (
      index == null ||
      isNaN(index) ||
      index < 0 ||
      index >= navItems.length
    ) {
      setNavSubItems([])
      return
    }
    const navItem = navItems[index]
    if (navItem?.subitems == null || navItem?.subitems?.length <= 0) {
      setNavSubItems([])
      return
    }
    let navSubItems = navItem.subitems || []
    navSubItems = _.filter(navSubItems, (item: any) => {
      if (!item.hasOwnProperty("reqToken")) {
        return true
      }
      return item.reqToken === isToken
    })
    setNavSubItems(navSubItems)

    // anchor
    // console.log('onPopoverOpen anchor', event.currentTarget, navSubItems)
    itemHovering.current = true
    setAnchorElPopover(event.currentTarget)
  }

  const onPopoverAway = () => {
    itemHovering.current = false
  }

  const onPopoverClose = () => {
    // console.log('onPopoverClose')
    setAnchorElPopover(null)
  }

  const onPopoverHover = () => {
    // console.log('onPopoverHover')
    popoverHovering.current = true
  }

  const onPopoverHoverClose = () => {
    // console.log('onPopoverHoverClose')
    popoverHovering.current = false
    setTimeout(() => {
      // console.log('onPopoverHoverClose -- timeout', popoverHovering.current)
      if (!popoverHovering.current && !itemHovering.current) {
        // console.log('onPopoverHoverClose -- close')
        onPopoverClose()
      }
    }, 100)
  }

  const onLogout = useCallback(async () => {
    try {
      setLoading(true)
      await fetch("/api/aims/auth/logout", {
        method: "POST",
      })
      router.push("/admin/login")
      setAnchorElPopover(null)
      setLoading(false)
    } catch (error: any) {
      // console.error('validate failed', error)
      setLoading(false)
    }
  }, [router, setLoading])

  const renderItem = (item: Record<string, any>, index: number, isMobile = false) => {
    let itype = item?.type
    if (isMobile && itype !== "icon" && itype !== "cart") {
      itype = "mobile" // override
    }
    const hasSubItems = item.hasOwnProperty('subitems')
    switch (itype) {
      case "icon":
      case "cart": {
        const isExternal = item.link?.includes?.("http")
        if (isExternal) {
          return (
            <a href={item.link || ""} className="p-2" target={isExternal ? "_blank" : undefined}>
              {item.icon}
            </a>
          )
        }
        return (
          <Link href={`${basePath}/${item.link}`} className="p-2">
            {item.icon}
          </Link>
        )
      }
      case "parent":
      case "user":
        // onClick={onPopoverClick}
        return (
          <Link
            href={`${basePath}/${item.link}`}
            onClick={onPopoverOpen}
            onMouseEnter={onPopoverOpen}
            onMouseLeave={() => {
              onPopoverAway()
              onPopoverHoverClose()
            }}
            color={"hilldark"}
            style={{
              // color: 'white',
              // fontSize: '16px',
              // fontWeight: 300,
              // fontFamily: lato.style.fontFamily,
              // padding: '2px',
            }}
            data-index={index}>
            {item.icon || null}
            {item.label || null}
            <IconKeyboardArrowDown sx={{ py: "2px" }} />
          </Link>
        )
      case "logout":
        return (
          <Button onClick={onLogout} color={"hilldark"}>
            {item.label}
          </Button>
        )
      // case "button":
      //   return (
      //     <Button onClick={onPopoverClose} color={"hilldark"}>
      //       <Link href={`${basePath}/${item.link}`}>{item.label}</Link>
      //     </Button>
      //   )
      case "link":
      default:
        break
    }
    // line-height: 1.75;
    // letter-spacing: 0.02857em;
    return (
      <Link href={`${basePath}/${item.link}`}
        className="p-2 mt-2 leading-[1.75] tracking-[0.02857em]" 
        onClick={($event) => {
          onPopoverClose()

          // mobile override
          if (isMobile && hasSubItems) {
            $event.preventDefault()
            item.isExpand = !item.isExpand
            setNavItems(([] as any[]).concat(...navItems))
            return
          }

          setIsExpand(false)
        }
      }>
        <div className="inline-block">{item.label}</div>
        {
          hasSubItems ? 
          (
            item.isExpand ?
            <IconKeyboardArrowUp sx={{ mx: 1 }} /> :
            <IconKeyboardArrowDown sx={{ mx: 1 }} />
          ) : null
        }
      </Link>
    )
  }

  const isDarkTheme = useCallback(() => {
    let result = false

    switch (pathname) {
      case "/faq":
      case "/treatment/cbd":
      // case "/testimonials":
      case '/shop':
      case '/contact':
      case '/consult':
      case '/contact/patient':
      case '/contact/clinical':
      case '/terms-of-use':
      case '/disclaimer':
        result = true
        break
    }

    return result
  }, [
    pathname,
  ])

  useEffect(() => {
    const isDark = isDarkTheme()
    setTheme(isDark ? 'dark' : 'light')
  }, [
    isDarkTheme,
    setTheme,
  ])

  const themeClasses = isDarkTheme()
    ? `w-[100%] text-[white] bg-[#2d382e]`
    : "bg-[transparent]"

  return (
    <div className={clsx(themeClasses, styles.navbar)}>
      <div className="header flex w-full m-auto py-4 px-4">
        <div className={clsx(
          "nav-expand flex flex-col justify-center",
          cstyles.isMobile,
          styles.expandWrapper,
        )}>
          {
            isExpand ?
            null:
            <IconMenu onClick={() => setIsExpand(true)} className={styles.expandIcon} />
          }
        </div>
        <div className={clsx("logo flex flex-col justify-center", styles.logo)}>
          {isAdmin ? (
            <Link href={"/admin"}>
              <h3>Hillmed Admin</h3>
            </Link>
          ) : (
            <Link href={"/"}>
              <h3 className="tracking-[0.5rem] font-bold">HILLMED</h3>
            </Link>
          )}
        </div>
        <div className={clsx(
          "nav-menu",
          styles.navMenu,
          isExpand ? "is-expand" : "",
        )}>
          <nav>
            <ul className="flex gap-[8px] align-middle">
              {
                navItems.map((item, index) => {
                  return (
                    <li key={`${index}`}>
                      {renderItem(item, index)}
                    </li>
                  )
                })
              }
              {
                navSubItems == null || navSubItems?.length <= 0 ?
                null :
                <Menu
                  id={id}
                  anchorEl={anchorElPopover}
                  open={Boolean(anchorElPopover)}
                  onClose={onPopoverClose}
                  MenuListProps={{
                    onMouseEnter: onPopoverHover,
                    onMouseLeave: onPopoverHoverClose,
                    style: { pointerEvents: "auto" },
                  }}
                  anchorOrigin={{
                    horizontal: "left",
                    vertical: "bottom",
                  }}
                  sx={{
                    [`&.${popoverClasses.root}`]: { pointerEvents: "none" },
                  }}>
                  {
                    navSubItems.map((item, index) => {
                      return (
                        <MenuItem key={`${index}`}>
                          {renderItem(item, index)}
                        </MenuItem>
                      )
                    })
                  }
                </Menu>
              }
            </ul>
          </nav>
        </div>
        {/* <div className={clsx("nav-cart flex flex-col justify-center", cstyles.isMobile)}>
          <div className=" flex flex-col justify-center cursor-pointer rounded-full bg-slate-300 p-2">
            <IconShoppingBag />
          </div>
        </div> */}
      </div>
      {
        isExpand ?
        (
          <Box className={clsx("nav-menu-mobile-wrapper", styles.navMenuMobileWrapper)}
            sx={{ zIndex: 2 }}>
            <div className={clsx(
              "nav-menu-mobile-top p-4",
              styles.navMenuBase,
              styles.navMenuMobileTop,
            )}>
              <div className="flex flex-col justify-center">
                <IconClose onClick={() => setIsExpand(false)} className={styles.expandIcon} />
              </div>
              <div className={clsx("logo", styles.logoExpanded)}>
                {isAdmin ? (
                  <Link href={"/admin"}>
                    <h3>Hillmed Admin</h3>
                  </Link>
                ) : (
                  <Link href={"/"}>
                    <h3 className="tracking-[0.5rem] font-bold">HILLMED</h3>
                  </Link>
                )}
              </div>
            </div>
            <ul className={clsx("flex flex-col gap-[16px] py-8 pb-16 px-16", styles.navMenuBase)}>
              {
                navItems.map((item, index) => {
                  return (
                    <li key={`${index}`}>
                      {renderItem(item, index, true)}
                      {
                        (item.hasOwnProperty('subitems') && item.isExpand) ? (
                          <ul className="flex flex-col gap-[16px] mt-4 px-8">
                          {
                            item.subitems.map((subitem: any, sindex: number) => {
                              return (
                                <li key={`${sindex}`}>
                                  {renderItem(subitem, sindex, true)}
                                </li>
                              )
                            })
                          }
                          </ul>
                        ) : null
                      }
                    </li>
                  )
                })
              }
            </ul>
          </Box>
        ) : null
      }
    </div>
  )
}

export default Nav
