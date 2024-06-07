import type { FormAttrInfo, KeyInfo } from "@/components/form/forminterface"
import { TableCol, TableColAction } from "@/components/table/tableinterface"

import IconEdit from "@mui/icons-material/Edit"
import IconVisibility from "@mui/icons-material/Visibility"

const EmailConstants = {
  Form: {
    ATTRS: [
      {
        id: "name",
        label: "Name",
        type: "input",
        controlSx: { width: { xs: "100%", sm: "100%" } },
      },
      {
        id: "email",
        label: "Email",
        type: "input",
        controlSx: { width: { xs: "100%", sm: "100%" } },
      },
      {
        id: "sort",
        label: "Sort",
        type: "input",
        inputType: 'number',
        controlSx: { width: { xs: "100%", sm: "100%" } },
      },
      {
        id: "notes",
        label: "Notes",
        type: "input",
        multiline: true,
        minRows: 3,
        controlSx: { width: { xs: "100%", sm: "100%" } },
      },
      {
        id: "disabled",
        label: "Disabled",
        type: "checkbox",
        controlSx: { width: { xs: "100%", sm: "100%" } },
      },
    ] as FormAttrInfo[],
    KEYS: [
      { key: "name", vtype: "string", default: undefined },
      { key: "email", vtype: "string", default: undefined },
      { key: "sort", vtype: "int", default: undefined },
      { key: "disabled", vtype: "boolean", default: undefined },
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
        label: "Name",
      },
      {
        id: "email",
        numeric: false,
        label: "Email",
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

export default EmailConstants
