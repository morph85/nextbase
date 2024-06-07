import * as React from "react"
import Box from "@mui/material/Box"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableSortLabel from "@mui/material/TableSortLabel"
import Checkbox from "@mui/material/Checkbox"
import { visuallyHidden } from "@mui/utils"

import type { TableCol } from "./tableinterface"
import type { Order } from "./sort"

interface TableHeadProps {
  cols: TableCol[]
  info: Record<string, any>
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

const BaseTableHead = (props: TableHeadProps) => {
  const {
    cols,
    info,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props

  const {} = info

  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  const renderCol = (col: TableCol, cindex: number) => {
    const sx = {
      ...(col.width != null ? { width: col.width } : {}),
      ...(col.minWidth != null ? { width: col.minWidth } : {}),
      ...{ bgcolor: "gray", fontWeight: "bold" },
    }
    return (
      <TableCell
        key={`${cindex}`}
        align={col.align === "default" ? "left" : col.align}
        sortDirection={orderBy === col.id ? order : false}
        sx={sx}
      >
        <TableSortLabel
          active={orderBy === col.id}
          direction={orderBy === col.id ? order : "asc"}
          onClick={createSortHandler(`${String(col.id)}`)}
        >
          {col.label}
          {orderBy === col.id ? (
            <Box component="span" sx={visuallyHidden}>
              {order === "desc" ? "sorted descending" : "sorted ascending"}
            </Box>
          ) : null}
        </TableSortLabel>
      </TableCell>
    )
  }

  return (
    <TableHead>
      <TableRow>
        {info.withCheckbox ? (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all",
              }}
            />
          </TableCell>
        ) : null}
        {cols.map((col, cindex) => {
          return renderCol(col, cindex)
        })}
      </TableRow>
    </TableHead>
  )
}

export default BaseTableHead
