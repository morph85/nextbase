import { useState } from "react"

import PageConstants from "@/app/admin/page/_sub/constants"

import ListSubheader from "@mui/material/ListSubheader"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Collapse from "@mui/material/Collapse"
import IconExpandLess from "@mui/icons-material/ExpandLess"
import IconExpandMore from "@mui/icons-material/ExpandMore"

// icons
import IconFolder from "@mui/icons-material/Folder"
import IconFolderOpen from "@mui/icons-material/FolderOpen"
import IconSubtitles from "@mui/icons-material/Subtitles"

type AdminPageProps = {
  selected: string | undefined
  setSelected: Function
}

const AdminPage = (props: AdminPageProps) => {
  const { selected, setSelected } = props

  const [items, setItems] = useState(
    PageConstants.ITEMS_MENU as Record<string, any>[],
  )

  const onSelect = (item: Record<string, any>) => {
    if (!setSelected) return
    setSelected(item.value)
  }

  const onClick = (item: Record<string, any>) => {
    if (item.hasOwnProperty("subs")) {
      for (let i in items) {
        let it = items[i]
        if (item && it.value === item.value) {
          it.isOpen = !it.isOpen
        } else {
          it.isOpen = false
        }
      }
      setItems(([] as Record<string, any>[]).concat(items))
      return
    }
    onSelect(item)
  }

  const renderItems = () => {
    return items.map((item: Record<string, any>, index: number) => {
      if (item == null) return null
      if (item.hasOwnProperty("subs")) {
        return (
          <div key={`${index}`}>
            <ListItemButton
              onClick={() => onClick(item)}
              selected={item.value === selected}
            >
              <ListItemIcon>
                <IconFolderOpen />
              </ListItemIcon>
              <ListItemText primary={item.label || item.value || "(NULL)"} />
              {item.isOpen ? <IconExpandLess /> : <IconExpandMore />}
            </ListItemButton>
            <Collapse in={item.isOpen} timeout="auto" unmountOnExit>
              {renderSubs(item)}
            </Collapse>
          </div>
        )
      }
      return (
        <ListItemButton
          key={`${index}`}
          onClick={() => onClick(item)}
          selected={item.value === selected}
        >
          <ListItemIcon>
            <IconFolder />
          </ListItemIcon>
          <ListItemText primary={item.label || item.value || "(NULL)"} />
        </ListItemButton>
      )
    })
  }

  const renderSubs = (item: Record<string, any>) => {
    if (item.subs == null || item.subs.length <= 0) return null
    return (
      <List component="div" disablePadding>
        {item.subs.map((sub: Record<string, any>, sindex: number) => {
          return (
            <ListItemButton
              key={`${sindex}`}
              sx={{ pl: 4 }}
              onClick={() => onClick(sub)}
              selected={sub.value === selected}
            >
              <ListItemIcon>
                <IconSubtitles />
              </ListItemIcon>
              <ListItemText primary={sub.label || sub.value || "(NULL)"} />
            </ListItemButton>
          )
        })}
      </List>
    )
  }

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 280,
        bgcolor: "background.paper",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Page Items
        </ListSubheader>
      }
    >
      {renderItems()}
    </List>
  )
}

export default AdminPage
