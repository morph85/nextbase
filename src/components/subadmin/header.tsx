import * as React from "react"
// import Box from '@mui/material/Box'
// import BaseButton from '@/components/sub/button'

// import { useAppStore } from '@/store/app-provider'

// type Props = {
//   loading: boolean,
//   children: any,
// }

const AdminHeader = (props: any) => {
  const { title, children } = props

  return (
    <div className="w-full">
      <div className="p-4 theme-light rounded-t text-black align-middle flex">
        <div className="flex-1 py-1">{title}</div>
        {children}
      </div>
    </div>
  )
}

export default AdminHeader
