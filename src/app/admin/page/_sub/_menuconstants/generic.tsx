import type {
  FormAttrInfo /* , KeyInfo */,
} from "@/components/form/forminterface"

const AttrsMain = [
  {
    id: "title",
    label: "Title",
    type: "input",
    controlSx: { width: { xs: "100%", sm: "100%" } },
  },
  {
    id: "content",
    label: "Content",
    type: "tiptap",
    controlSx: { width: { xs: "100%", sm: "100%" } },
  },
] as FormAttrInfo[]

const AttrsImage = [
  {
    id: "image",
    label: "Image",
    type: "upload",
    controlSx: { width: { xs: "100%", sm: "100%" } },
  },
] as FormAttrInfo[]

const AttrsMainWithImage = [...AttrsMain, ...AttrsImage] as FormAttrInfo[]

// const AttrsButton =  [
//   {
//     id: 'buttonLabel',
//     label: 'Button Label',
//     type: 'input',
//     controlSx: { width: { xs: '100%', sm: '100%' } },
//   }, {
//     id: 'buttonLink',
//     label: 'Button Link',
//     type: 'input',
//     controlSx: { width: { xs: '100%', sm: '100%' } },
//   },
// ] as FormAttrInfo[]

const getAttrsButton = (index: number) => {
  return [
    {
      id: `buttonLabel${index}`,
      label: `Button Label ${index}`,
      type: "input",
      controlSx: { width: { xs: "100%", sm: "100%" } },
    },
    {
      id: `buttonLink${index}`,
      label: `Button Link ${index}`,
      type: "input",
      controlSx: { width: { xs: "100%", sm: "100%" } },
    },
  ] as FormAttrInfo[]
}

const AttrsContent = [
  {
    id: "content",
    label: "Content",
    type: "tiptap",
    controlSx: { width: { xs: "100%", sm: "100%" } },
  },
] as FormAttrInfo[]

const AttrsImages = [
  {
    id: "image-1",
    label: "Image 1",
    type: "upload",
    controlSx: { width: { xs: "100%", sm: "100%" } },
  },
  {
    id: "image-2",
    label: "Image 2",
    type: "upload",
    controlSx: { width: { xs: "100%", sm: "100%" } },
  },
  {
    id: "image-3",
    label: "Image 3",
    type: "upload",
    controlSx: { width: { xs: "100%", sm: "100%" } },
  },
] as FormAttrInfo[]

const AttrsTitle = [
  {
    id: "title",
    label: "Title",
    type: "input",
    controlSx: { width: { xs: "100%", sm: "100%" } },
  },
] as FormAttrInfo[]

const AttrsTitleContentButton = [
  {
    id: "title",
    label: "Title",
    type: "input",
    controlSx: { width: { xs: "100%", sm: "100%" } },
  },
  {
    id: "content",
    label: "Content",
    type: "tiptap",
    controlSx: { width: { xs: "100%", sm: "100%" } },
  },
  ...getAttrsButton(1),
] as FormAttrInfo[]

const AttrsTitleContentButtonWithImage = [
  ...AttrsTitleContentButton,
  ...AttrsImage,
] as FormAttrInfo[]

const AttrsTitleSubtitleContentButton = [
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
  ...getAttrsButton(1),
] as FormAttrInfo[]

const AttrsTitleSubtitleContentButtonWithImage = [
  ...AttrsTitleSubtitleContentButton,
  ...AttrsImage,
] as FormAttrInfo[]

const GenericAttrs = {
  AttrsMain,
  AttrsMainWithImage,
  AttrsContent,
  getAttrsButton,
  AttrsImage,
  AttrsImages,
  AttrsTitle,
  AttrsTitleContentButton,
  AttrsTitleContentButtonWithImage,
  AttrsTitleSubtitleContentButton,
  AttrsTitleSubtitleContentButtonWithImage,
}

export default GenericAttrs
