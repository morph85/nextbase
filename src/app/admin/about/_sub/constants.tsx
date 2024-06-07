import type { FormAttrInfo, KeyInfo } from "@/components/form/forminterface"
import { TableCol, TableColAction } from "@/components/table/tableinterface"

import IconEdit from "@mui/icons-material/Edit"
import IconVisibility from "@mui/icons-material/Visibility"

const AboutConstants = {
  Form: {
    ATTRS: [
      {
        id: "name",
        label: "Name",
        type: "input",
        controlSx: { width: { xs: "100%", sm: "100%" } },
      },
      {
        id: "title",
        label: "Title",
        type: "input",
        controlSx: { width: { xs: "100%", sm: "100%" } },
      },
      {
        id: "subtitle",
        label: "Subtitle",
        type: "input",
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
      { key: "title", vtype: "string", default: undefined },
      { key: "subtitle", vtype: "string", default: undefined },
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
        label: "Name",
      },
      {
        id: "title",
        numeric: false,
        label: "Title",
      },
      {
        id: "subtitle",
        numeric: false,
        label: "Subtitle",
      },
      {
        id: "content",
        numeric: false,
        label: "Content",
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

export default AboutConstants
