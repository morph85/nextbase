import * as React from "react"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"

import type { TableCol, TableInfo, TableColAction } from "./tableinterface"
import type { Order } from "./sort"
import { stableSort, getComparator } from "./sort"

import BaseTableHead from "./tablehead"
import BaseTableToolbar from "./tabletoolbar"

import BaseButton from "@/components/sub/button"

type BaseTableProps = {
  data: Record<string, any>[]
  cols: TableCol[]
  info: TableInfo
  // meta
  // events
  onPageChange?: Function
  onRowsPerPageChange?: Function
  onActionClick?: Function
}

const BaseTable = (props: BaseTableProps) => {
  const {
    data,
    cols,
    info,
    // events
    onPageChange,
    onRowsPerPageChange,
    onActionClick,
  } = props

  const {
    defaultOrder,
    defaultOrderId,
    page, // 0
    rowsPerPage, // 5
    totalRows,
    // meta control
    withToolbar,
    withCheckbox,
    withDenseControl,
    withDebug,
  } = info || {}

  const [order, setOrder] = React.useState<Order>(defaultOrder || "asc")
  const [orderBy, setOrderBy] = React.useState<string>(defaultOrderId || "")
  // const [page, setPage] = React.useState(0)
  // const [rowsPerPage, setRowsPerPage] = React.useState(5)

  // control
  const [selected, setSelected] = React.useState<readonly string[]>([])

  // meta
  const [rowsPerPageOptions] = React.useState<number[]>([5, 10, 25])
  const [dense, setDense] = React.useState(false)

  const onSortRequest = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const onSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const onRowClick = (event: React.MouseEvent<unknown>, id: string) => {
    if (!withCheckbox) {
      return
    }
    const selectedIndex = selected.indexOf(id)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }
    setSelected(newSelected)
  }

  const _onActionClick = (action: TableColAction, row: Record<string, any>) => {
    if (onActionClick) {
      onActionClick(action, row)
    }
  }

  const _onPageChange = (event: unknown, newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage)
    }
    // setPage(newPage)
  }

  const _onRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onRowsPerPageChange) {
      const newRowsPerPage = parseInt(event.target.value, 10)
      onRowsPerPageChange(newRowsPerPage)
    }
    // setRowsPerPage(parseInt(event.target.value, 10))
    // setPage(0)
  }

  const onDenseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked)
  }

  const isSelected = (id: string) => selected.indexOf(id) !== -1

  // const _page = page != null ? page : 0
  // const _rowsPerPage = rowsPerPage != null ? rowsPerPage : 20
  // const _totalRows = totalRows != null ? totalRows : 0
  const _page = React.useMemo(() => {
    return page != null ? page : 0
  }, [page])

  const _rowsPerPage = React.useMemo(() => {
    return rowsPerPage != null ? rowsPerPage : 20
  }, [rowsPerPage])

  const _totalRows = React.useMemo(() => {
    return totalRows != null ? totalRows : 0
  }, [totalRows])

  // avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = React.useMemo(() => {
    return _page > 0 ? Math.max(0, (1 + _page) * _rowsPerPage - _totalRows) : 0
  }, [_page, _rowsPerPage, _totalRows])

  const visibleRows = React.useMemo(() => {
    return stableSort(data, getComparator(order, orderBy)).slice(
      _page * _rowsPerPage,
      _page * _rowsPerPage + _rowsPerPage,
    )
  }, [data, order, orderBy, _page, _rowsPerPage])

  const renderCol = (
    col: TableCol,
    cindex: number,
    row: Record<string, any>,
    labelId: string,
  ) => {
    const align = col.align === "default" ? "left" : col.align
    const sx = {
      ...(col.width != null ? { width: col.width } : {}),
      ...(col.minWidth != null ? { width: col.minWidth } : {}),
    }
    if (col.actions != null) {
      return (
        <TableCell key={`${cindex}`} align={align} sx={sx}>
          {col.actions.map((act, actindex) => {
            return (
              <BaseButton
                key={`${actindex}`}
                className="inline-block"
                sx={{
                  border: "1px solid transparent",
                  padding: "2px 6px",
                  minWidth: 0,
                }}
                onClick={() => _onActionClick(act, row)}
              >
                {act.icon}
              </BaseButton>
            )
          })}
        </TableCell>
      )
    }
    if (col.isId) {
      return (
        <TableCell
          key={`${cindex}`}
          component="th"
          id={labelId}
          scope="row"
          align={align}
          sx={sx}
        >
          {row[col.id]}
        </TableCell>
      )
    }
    return (
      <TableCell key={`${cindex}`} align={align} sx={sx}>
        {row[col.id]}
      </TableCell>
    )
  }

  return (
    <Box sx={{ width: "100%" }}>
      {withDebug ? (
        <Paper sx={{ width: "100%", mb: 2, bgcolor: "blue" }}>
          <div>Page: {_page}</div>
          <div>Rows Per Page: {_rowsPerPage}</div>
          <div>Total Rows: {_totalRows}</div>
        </Paper>
      ) : null}

      <Paper sx={{ width: "100%", mb: 2 }}>
        {withToolbar ? (
          <BaseTableToolbar numSelected={selected.length} />
        ) : null}
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <BaseTableHead
              cols={cols}
              info={info}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={onSelectAllClick}
              onRequestSort={onSortRequest}
              rowCount={totalRows != null ? totalRows : 0}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(`${String(row.id)}`)
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    onClick={(event) => onRowClick(event, `${String(row.id)}`)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    {withCheckbox ? (
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                    ) : null}
                    {cols.map((col, cindex) => {
                      return renderCol(col, cindex, row, labelId)
                    })}
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={totalRows != null ? totalRows : 0}
          rowsPerPage={rowsPerPage != null ? rowsPerPage : 20}
          page={page != null ? page : 0}
          onPageChange={_onPageChange}
          onRowsPerPageChange={_onRowsPerPageChange}
        />
      </Paper>
      {withDenseControl ? (
        <FormControlLabel
          control={<Switch checked={dense} onChange={onDenseChange} />}
          label="Dense padding"
        />
      ) : null}
    </Box>
  )
}

export default BaseTable
