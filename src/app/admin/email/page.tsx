"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { useAppStore } from "@/store/app-provider"

import EmailConstants from "@/app/admin/email/_sub/constants"

import BasePage from "@/components/sub/page"
import BaseTable from "@/components/table/table"
import type {
  TableCol,
  TableColAction,
  TableInfo,
} from "@/components/table/tableinterface"

import AdminHeader from "@/components/subadmin/header"

const EmailList = (props: any) => {
  const router = useRouter()
  const { setLoading } = useAppStore((state: any) => state)

  const [table, setTable] = useState<Record<string, any>[]>([])
  const [tinfo, setTinfo] = useState<TableInfo>({
    page: 0,
    rowsPerPage: 10,
    totalRows: 0,
    defaultOrder: "asc",
    defaultOrderId: "calories",
  })

  const onTablePageChange = (newPage: number) => {
    setTinfo((prev) => {
      return {
        ...prev,
        page: newPage,
      }
    })
  }

  const onTableRowsPerPageChange = (newRowsPerPage: number) => {
    setTinfo((prev) => {
      return {
        ...prev,
        page: 0,
        rowsPerPage: newRowsPerPage,
      }
    })
  }

  const cols: TableCol[] = EmailConstants.Table.COLS

  useEffect(() => {
    const data = [
      {
        id: 1,
        name: "William",
        email: "william@adaptconcepts.com",
        disabled: true,
      },
      {
        id: 2,
        name: "Amanda",
        email: "amanda@alliedinstructional.com",
        disabled: false,
      },
    ]
    setLoading(true)
    setTimeout(() => {
      setTable(data)
      setTinfo((prev) => {
        return {
          ...prev,
          page: 0,
          totalRows: data.length,
        }
      })
      setLoading(false)
    }, 1000)
  }, [setLoading])

  const onTableActionClick = (
    action: TableColAction,
    row: Record<string, any>,
  ) => {
    if (row == null || !row.id) {
      return
    }
    switch (action.type) {
      case "view":
      case "edit":
        router.push(`/admin/email/${row.id}`)
      default:
        break
    }
  }

  return (
    <BasePage className="w-full min-h-[50vw]">
      <div className="w-full p-4 py-8">
        <AdminHeader title="Email" />
        <BaseTable
          data={table}
          cols={cols}
          info={tinfo}
          onPageChange={onTablePageChange}
          onRowsPerPageChange={onTableRowsPerPageChange}
          onActionClick={onTableActionClick}
        />
      </div>
    </BasePage>
  )
}

export default EmailList
