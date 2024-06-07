import { useState, useMemo } from "react"
import { type Editor } from "@tiptap/react"

import { Button } from "@mui/material"

import IconFormatBold from "@mui/icons-material/FormatBold"
import IconFormatItalic from "@mui/icons-material/FormatItalic"
import IconFormatUnderline from "@mui/icons-material/FormatUnderlined"
import IconFormatListBulleted from "@mui/icons-material/FormatListBulleted"
import IconFormatListNumbered from "@mui/icons-material/FormatListNumbered"
import IconUndo from "@mui/icons-material/Undo"
import IconRedo from "@mui/icons-material/Redo"
import IconLink from "@mui/icons-material/Link"
import IconLinkOff from "@mui/icons-material/LinkOff"

type TipTapMenuProps = {
  editor: Editor
  disabled?: boolean
}

const TipTapMenu = (props: TipTapMenuProps) => {
  const { editor, disabled } = props
  // const props = defineProps([
  //   'editor',
  //   'disabled',
  // ])

  // const [state] = useState({
  //   dialogLink: {
  //     visible: false,
  //     value: undefined as string | undefined,
  //   },
  //   isHeadingVisible: false,
  // })

  const [_dialogLinkVisible, setDialogLinkVisible] = useState(false)
  const [_dialogLinkValue, setDialogLinkValue] = useState(
    undefined as string | undefined,
  )
  // const [isHeadingVisible, setIsHeadingVisible] = useState(false)

  const isDisabled = (action: string) => {
    switch (action) {
      case "bold":
        return !editor?.can().chain().focus().toggleBold().run()
      case "italic":
        return !editor?.can().chain().focus().toggleItalic().run()
      case "strike":
        return !editor?.can().chain().focus().toggleStrike().run()
      case "underline":
        return !editor?.can().chain().focus().toggleUnderline().run()
      case "clear":
        return false
      case "heading":
        return false
      case "bulletList":
        return false
      // return !editor?.can().chain().focus().toggleBulletList().run()
      case "orderedList":
        return false
      // return !editor?.can().chain().focus().toggleOrderedList().run()
      case "undo":
        return !editor?.can().chain().focus().undo().run()
      case "redo":
        return !editor?.can().chain().focus().redo().run()
      default:
        break
    }
    return false
  }

  const onClick = (action: string, param1: any | undefined = undefined) => {
    // console.log(`${cname}: on click editor`, editor)
    switch (action) {
      case "bold":
        editor?.chain().focus().toggleBold().run()
        break
      case "italic":
        editor?.chain().focus().toggleItalic().run()
        break
      case "strike":
        editor?.chain().focus().toggleStrike().run()
        break
      case "underline":
        editor?.chain().focus().toggleUnderline().run()
        break
      case "clear":
        editor?.chain().focus().unsetAllMarks().run()
        break
      case "heading":
        editor?.chain().focus().toggleHeading({ level: param1 }).run()
        break
      case "bulletList":
        editor?.chain().focus().toggleBulletList().run()
        break
      case "orderedList":
        editor?.chain().focus().toggleOrderedList().run()
        break
      case "undo":
        editor?.chain().focus().undo().run()
        break
      case "redo":
        editor?.chain().focus().redo().run()
        break
      default:
        break
    }
  }

  const isDialogLink = useMemo(() => {
    return (
      editor?.getAttributes("link")?.href &&
      editor?.getAttributes("link")?.href?.length > 0
    )
  }, [editor])

  const onDialogUnlink = () => {
    editor?.commands.unsetLink()
  }

  const onDialogLink = () => {
    // state.dialogLink.value = editor?.getAttributes('link')?.href || 'https://'
    // state.dialogLink.visible = true
    setDialogLinkValue(editor?.getAttributes("link")?.href || "https://")
    setDialogLinkVisible(true)
  }

  // const onDialogLinkSubmit = () => {
  //   try {
  //     if (dialogLinkValue == null || dialogLinkValue?.length <= 0) {
  //       throw new Error('invalid link')
  //     }
  //     const commands = editor?.commands
  //     const { /* from, to, */empty } = editor?.state?.selection || {}
  //     if (empty) {
  //       commands?.command(({ tr, dispatch }: any) => {
  //         if (!dispatch) return true
  //         const { from, to } = tr.selection
  //         const url = dialogLinkValue || ''
  //         tr.insertText(url, from, to)
  //         tr.addMark(
  //           from,
  //           from + url.length,
  //           props?.editor.schema.marks.link.create({ href: url }),
  //         )
  //         setDialogLinkVisible(false)
  //         return true
  //       })
  //       return
  //     }
  //     // const selectedText = editor?.state?.doc?.textBetween?.(from, to, ' ')
  //     commands?.toggleLink({ href: dialogLinkValue, target: '_blank' })
  //     setDialogLinkVisible(false)
  //   } catch (error: any) {
  //     console.error(`Link failed: ${(error.message && JSON.stringify(error.message)) || error}`, error)
  //     // Mbox.notify({
  //     //   message: `Link failed: ${(error.message && JSON.stringify(error.message)) || error}`,
  //     //   type: 'error',
  //     // })
  //   }
  // }

  // const onHeadingShow = () => {
  //   // state.isHeadingVisible = true
  //   setIsHeadingVisible(true)
  // }

  // const onHeadingHide = () => {
  //   // state.isHeadingVisible = false
  //   setIsHeadingVisible(false)
  // }

  const sx = {
    button: {
      padding: "4px 8px",
      minWidth: "18px",
      margin: "0px 4px 0px 0px",
    },
    separator: {
      display: "inline-block",
      verticalAlign: "middle",
      borderLeft: "1px solid lightgray",
      marginLeft: "4px",
      marginRight: "6px",
      height: "34px",
    },
  }

  return (
    <div className="tiptap-menu p-2 rounded-t bg-white">
      <Button
        className={`${editor?.isActive("bold") ? "is-active" : ""} no-border`}
        variant={editor?.isActive("bold") ? "contained" : "outlined"}
        disabled={disabled || isDisabled("bold")}
        onClick={() => onClick("bold")}
        color="hilldark"
        sx={sx.button}
      >
        <IconFormatBold />
      </Button>
      <Button
        className={`${editor?.isActive("italic") ? "is-active" : ""} no-border`}
        variant={editor?.isActive("italic") ? "contained" : "outlined"}
        disabled={disabled || isDisabled("italic")}
        onClick={() => onClick("italic")}
        color="hilldark"
        sx={sx.button}
      >
        <IconFormatItalic />
      </Button>
      <Button
        className={`${editor?.isActive("underline") ? "is-active" : ""} no-border`}
        variant={editor?.isActive("underline") ? "contained" : "outlined"}
        disabled={disabled || isDisabled("underline")}
        onClick={() => onClick("underline")}
        color="hilldark"
        sx={sx.button}
      >
        <IconFormatUnderline />
      </Button>
      <Button
        variant={"outlined"}
        disabled={disabled || isDisabled("clear")}
        onClick={() => onClick("clear")}
        color="hilldark"
        sx={sx.button}
      >
        Clear
      </Button>
      <div className="separator" style={sx.separator}></div>
      <Button
        className={`${editor?.isActive("bulletList") ? "is-active" : ""} no-border`}
        variant={editor?.isActive("bulletList") ? "contained" : "outlined"}
        disabled={disabled || isDisabled("bulletList")}
        onClick={() => onClick("bulletList")}
        color="hilldark"
        sx={sx.button}
      >
        <IconFormatListBulleted />
      </Button>
      <Button
        className={`${editor?.isActive("orderedList") ? "is-active" : ""} no-border`}
        variant={editor?.isActive("orderedList") ? "contained" : "outlined"}
        disabled={disabled || isDisabled("orderedList")}
        onClick={() => onClick("orderedList")}
        color="hilldark"
        sx={sx.button}
      >
        <IconFormatListNumbered />
      </Button>
      <div className="separator" style={sx.separator}></div>
      <Button
        className={`${editor?.isActive("undo") ? "is-active" : ""} no-border`}
        variant={editor?.isActive("undo") ? "contained" : "outlined"}
        disabled={disabled || isDisabled("undo")}
        onClick={() => onClick("undo")}
        color="hilldark"
        sx={sx.button}
      >
        <IconUndo />
      </Button>
      <Button
        className={`${editor?.isActive("redo") ? "is-active" : ""} no-border`}
        variant={editor?.isActive("redo") ? "contained" : "outlined"}
        disabled={disabled || isDisabled("redo")}
        onClick={() => onClick("redo")}
        color="hilldark"
        sx={sx.button}
      >
        <IconRedo />
      </Button>
      <div className="separator" style={sx.separator}></div>
      <Button
        className={`no-border`}
        variant={isDialogLink ? "contained" : "outlined"}
        disabled={disabled}
        onClick={() => onDialogLink()}
        color="hilldark"
        sx={sx.button}
      >
        <IconLink />
      </Button>
      <Button
        className={`no-border`}
        variant={isDialogLink ? "contained" : "outlined"}
        disabled={disabled || !isDialogLink}
        onClick={() => onDialogUnlink()}
        color="hilldark"
        sx={sx.button}
      >
        <IconLinkOff />
      </Button>
    </div>
  )
}

export default TipTapMenu
