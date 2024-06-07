import * as React from "react"
import BaseTable from "@/components/table/table"
import type { TableCol, TableInfo } from "@/components/table/tableinterface"

const ExampleTable = (props: any) => {
  const [table] = React.useState([
    {
      id: 1,
      name: "Cupcake",
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
    },
    { id: 2, name: "Donut", calories: 452, fat: 25.0, carbs: 51, protein: 4.9 },
    {
      id: 3,
      name: "Eclair",
      calories: 262,
      fat: 16.0,
      carbs: 24,
      protein: 6.0,
    },
    {
      id: 4,
      name: "Frozen yoghurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
    },
    {
      id: 5,
      name: "Gingerbread",
      calories: 256,
      fat: 16.0,
      carbs: 49,
      protein: 3.9,
    },
    {
      id: 6,
      name: "Honeycomb",
      calories: 408,
      fat: 3.2,
      carbs: 87,
      protein: 6.5,
    },
    {
      id: 7,
      name: "Ice cream sandwich",
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
    },
    {
      id: 8,
      name: "Jelly Bean",
      calories: 375,
      fat: 0.0,
      carbs: 94,
      protein: 0.0,
    },
    {
      id: 9,
      name: "KitKat",
      calories: 518,
      fat: 26.0,
      carbs: 65,
      protein: 7.0,
    },
    {
      id: 10,
      name: "Lollipop",
      calories: 392,
      fat: 0.2,
      carbs: 98,
      protein: 0.0,
    },
    {
      id: 11,
      name: "Marshmallow",
      calories: 318,
      fat: 0,
      carbs: 81,
      protein: 2.0,
    },
    { id: 12, name: "Nougat", calories: 360, fat: 19.0, carbs: 9, protein: 37 },
    { id: 13, name: "Oreo", calories: 437, fat: 18.0, carbs: 63, protein: 4.0 },
  ])

  const [tinfo, setTinfo] = React.useState<TableInfo>({
    page: 0,
    rowsPerPage: 5,
    totalRows: table.length,
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

  const cols: TableCol[] = [
    {
      id: "name",
      numeric: false,
      label: "Dessert (100g serving)",
    },
    {
      id: "calories",
      numeric: true,
      label: "Calories",
    },
    {
      id: "fat",
      numeric: true,
      label: "Fat (g)",
    },
    {
      id: "carbs",
      numeric: true,
      label: "Carbs (g)",
    },
    {
      id: "protein",
      numeric: true,
      label: "Protein (g)",
    },
  ]

  return (
    <div className={`w-full ${props.className || ""}`}>
      <BaseTable
        data={table}
        cols={cols}
        info={tinfo}
        onPageChange={onTablePageChange}
        onRowsPerPageChange={onTableRowsPerPageChange}
      />
    </div>
  )
}

export default ExampleTable
