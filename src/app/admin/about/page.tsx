"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { useAppStore } from "@/store/app-provider"

import AboutConstants from "@/app/admin/about/_sub/constants"

import BasePage from "@/components/sub/page"
import BaseTable from "@/components/table/table"
import type {
  TableCol,
  TableColAction,
  TableInfo,
} from "@/components/table/tableinterface"

import AdminHeader from "@/components/subadmin/header"

const AboutList = (props: any) => {
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

  const cols: TableCol[] = AboutConstants.Table.COLS

  useEffect(() => {
    const data = [
      {
        id: 1,
        name: "landing-section-1",
        title: "Landing Title 1",
        subtitle: "Landing Subtitle 1",
        content: "<b>Hello 123</b>",
      },
      {
        id: 2,
        name: "landing-section-2",
        title: "Landing Title 2",
        subtitle: "Landing Subtitle 2",
        content: "<b>Hello 456</b>",
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
        router.push(`/admin/about/${row.id}`)
      default:
        break
    }
  }

  return (
    <BasePage className="w-full min-h-[50vw]">
      <div className="w-full p-4 py-8">
        <AdminHeader title="About" />
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

export default AboutList
