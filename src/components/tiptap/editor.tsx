// i/f
// import { watch } from 'vue'
import { useEffect } from "react"

// tiptap
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
// import BulletList from '@tiptap/extension-bullet-list'
// import OrderedList from '@tiptap/extension-ordered-list'
// import ListItem from '@tiptap/extension-list-item'
// import Paragraph from '@tiptap/extension-paragraph'
// import Text from '@tiptap/extension-text'
import Link from "@tiptap/extension-link"

import EditorMenu from "@/components/tiptap/menu"
// import FormItemLabel from '@/components/form/formitemlabel.vue'
import Box from "@mui/material/Box"

import clsx from "clsx"
import styles from "@/components/tiptap/editor.module.scss"

const cname = "tiptap-editor"

// </script>

// <template>
//   <div class="tiptap-editor">
//     <slot name="label"></slot>
//     <div class="tiptap-wrapper"
//       :class="[
//         // (disabled ? 'is-disabled' : '')
//       ]">
//       <editor-menu :editor="editor" :disabled="disabled" />
//       <hr />
//       <editor-content
//         :editor="editor"
//         :disabled="disabled"
//         class="p-1 px-2"
//         :class="[
//           (disabled ? 'is-disabled' : '')
//         ]"
//         :style="[
//           (minHeight != null ? { minHeight } : {}),
//         ]"
//       />
//       <hr v-if="false" />
//       <div v-if="isPreview" class="text-xs p-1 px-2">
//         <pre><code>{{ modelValue }}</code></pre>
//       </div>
//     </div>
//   </div>
// </template>

// <style lang="scss">
// @import '@/styles/base_tiptap.scss';

// .tiptap-editor {
//   // background-color: red;
//   &.is-disabled,
//   .is-disabled {
//     background-color: #f5f7fa;
//     cursor: no-drop;
//   }
// }

type TipTapEditorProps = {
  value: any
  onValueChange?: Function
  isPreview?: boolean
  disabled?: boolean
  minHeight?: string | number
  // props
  label?: any
}

const TipTapEditor = (props: TipTapEditorProps) => {
  const {
    value,
    onValueChange,
    // isPreview,
    disabled,
    minHeight,
    // props
    label,
  } = props

  // const props = defineProps([
  //   'modelValue',
  //   // 'data',
  //   // 'id',
  //   'isPreview',
  //   'disabled',
  //   'minHeight',
  // ])
  // const emit = defineEmits([
  //   'update:modelValue',
  // ])

  // const _modelValue = reactive(props.modelValue)

  // tiptap

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      // Paragraph,
      // BulletList,
      // OrderedList,
      // ListItem,
      // Text,
      Link,
    ],
    content: value,
    editable: !props.disabled,
    onUpdate: () => {
      // HTML
      // emit('update:modelValue', editor.value?.getHTML())

      if (onValueChange) {
        onValueChange(editor?.getHTML())
      }

      // JSON
      // this.$emit('update:modelValue', this.editor.getJSON())
    },
    editorProps: {
      attributes: {
        class: `${minHeight != null ? `min-h-[${minHeight}]` : ""}`,
      },
    },
  })

  // watch(() => props.modelValue, (value) => {
  //   // console.log(`${cname}: watch change value'`, value)
  //   // HTML
  //   const isSame = editor.value?.getHTML() === value

  //   // JSON
  //   // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)
  //   if (isSame) {
  //     return
  //   }

  //   editor.value?.commands.setContent(value, false)
  // })

  useEffect(() => {
    console.log(`${cname}: watch change value'`, value)
    // HTML
    const isSame = editor?.getHTML() === value

    // JSON
    // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)
    if (isSame) {
      return
    }

    editor?.commands.setContent(value, false)
  }, [editor, value])

  return (
    <div
      className={clsx(["tiptap-editor border-r-4 border-[1px]"])}
      style={styles}
    >
      {label}
      <Box
        className="tiptap-wrapper"
        sx={{
          "& .ProseMirror": {
            // backgroundColor: 'red',
            ...(minHeight != null ? { minHeight } : {}),
          },
        }}
      >
        <EditorMenu editor={editor!} disabled={disabled} />
        <EditorContent
          editor={editor}
          disabled={disabled}
          className={clsx([`p-1 px-2 ${disabled ? "is-disabled" : ""}`])}
        />
      </Box>
    </div>
  )
}

export default TipTapEditor
