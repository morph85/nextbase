import type { FormAttrInfo, KeyInfo } from "@/components/form/forminterface"
import { TableCol, TableColAction } from "@/components/table/tableinterface"

import IconEdit from "@mui/icons-material/Edit"
import IconVisibility from "@mui/icons-material/Visibility"

const ProductConstants = {
  Form: {
    ATTRS: [
      {
        id: "name",
        label: "Product Name",
        type: "input",
        controlSx: { width: { xs: "100%", sm: "50%" } },
      },
      {
        id: "sort",
        label: "Sort",
        type: "input",
        inputType: "number",
        controlSx: { width: { xs: "100%", sm: "25%" } },
      },
      {
        id: "disabled",
        label: "Disabled",
        type: "checkbox",
        controlSx: { width: { xs: "100%", sm: "25%" } },
      },
      {
        id: "description",
        label: "Description",
        type: "input",
        multiple: true,
        minRows: 4,
        controlSx: { width: { xs: "100%", sm: "100%" } },
      },
      {
        id: "price",
        label: "Price",
        type: "input",
        inputType: "number",
        controlSx: { width: { xs: "100%", sm: "100%" } },
      },
      {
        id: "content",
        label: "Content",
        type: "tiptap",
        controlSx: { width: { xs: "100%", sm: "100%" } },
      },
    ] as FormAttrInfo[],
    KEYS: [
      { key: "name", vtype: "string", default: undefined },
      { key: "description", vtype: "string", default: undefined },
      { key: "price", vtype: "float", default: undefined },
      { key: "sort", vtype: "int", default: undefined },
      { key: "disabled", vtype: "boolean", default: undefined },
      { key: "content", vtype: "string", default: undefined },
    ] as KeyInfo[],
  },
  Table: {
    COLS: [
      {
        id: "id",
        isId: true,
        numeric: false,
        label: "ID",
        width: "36px",
      },
      {
        id: "name",
        numeric: false,
        label: "Product Name",
      },
      {
        id: "description",
        numeric: false,
        label: "Description",
      },
      {
        id: "price",
        numeric: true,
        label: "Price",
      },
      {
        id: "sort",
        numeric: true,
        label: "Sort",
      },
      {
        id: "disabled",
        numeric: false,
        label: "Disabled",
      },
      {
        id: "actions",
        numeric: false,
        align: "center",
        label: "Actions",
        width: "120px",
        actions: [
          {
            type: "view",
            icon: <IconVisibility />,
          },
          {
            type: "edit",
            icon: <IconEdit />,
          },
        ] as TableColAction[],
      },
    ] as TableCol[],
  },
}

export default ProductConstants
