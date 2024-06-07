"use client"

import React from "react"
import Link from "next/link"

import BasePage from "@/components/sub/page"

import IconPage from "@mui/icons-material/Pages"
import IconNoteAlt from "@mui/icons-material/NoteAlt"
import IconInfo from "@mui/icons-material/Info"
import IconEmail from "@mui/icons-material/Email"
import IconInventory from "@mui/icons-material/Inventory"
import IconShoppingCart from "@mui/icons-material/ShoppingCart"

const AdminDashboard = () => {
  const iconStyle: React.CSSProperties = {
    fontSize: '2em',
  }
  const items = [
    {
      label: "Pages",
      link: "/admin/page",
      icon: <IconNoteAlt style={iconStyle} />,
    },
    {
      label: "About",
      link: "/admin/about",
      icon: <IconInfo style={iconStyle} />,
    },
    {
      label: "Email",
      link: "/admin/email",
      icon: <IconEmail style={iconStyle} />,
    },
    {
      label: "Products",
      link: "/admin/product",
      icon: <IconInventory style={iconStyle} />,
    },
    {
      label: "Orders",
      link: "/admin/order",
      icon: <IconShoppingCart style={iconStyle} />,
    },
  ] as Record<string, any>[]

  return (
    <BasePage className="w-full min-h-[50vw]">
      <div className="w-full p-4 py-8">Dashboard</div>
      <div className="p-4 pb-8 grid grid-cols-3 gap-4">
        {items.map((item, index) => {
          return (
            <Link href={item.link} key={`${index}`}>
              <div className="bg-slate-300 text-slate-900 p-12 rounded text-center">
                <div className="inline-block align-middle p-4 pl-0 pr-8">
                  {item.icon || <IconPage style={iconStyle} />}
                </div>
                <div className="inline-block align-middle">
                  <h1 className="text-l">{item.label}</h1>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </BasePage>
  )
}

export default AdminDashboard
