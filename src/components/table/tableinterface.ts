import { ReactNode } from "react"
import type { Order } from "./sort"

export interface TableColAction {
  type: string
  icon: ReactNode
}

export interface TableCol {
  id: string
  isId?: boolean
  label: string
  numeric: boolean
  // type actions
  actions?: TableColAction[]
  // meta
  align?: "left" | "right" | "center" | "default"
  width?: number | string
  minWidth?: number | string
}

export interface TableInfo {
  page?: number // 0
  rowsPerPage?: number // 5
  totalRows?: number
  // order
  defaultOrder?: Order
  defaultOrderId?: string
  // events
  withToolbar?: boolean
  withCheckbox?: boolean
  withDenseControl?: boolean
  withDebug?: boolean
}
