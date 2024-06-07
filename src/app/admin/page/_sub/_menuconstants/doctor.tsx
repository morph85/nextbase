import GenericAttrs from "./generic"

const DoctorConstants = {
  SUBS: [
    {
      value: "doctor-main",
      label: "Medical Director",
      attrs: GenericAttrs.AttrsMainWithImage,
    },
    {
      value: "doctor-thought",
      label: "Thought",
      attrs: GenericAttrs.AttrsTitleContentButton,
    },
    {
      value: "doctor-why",
      label: "Why Ketamine & CBD",
      attrs: GenericAttrs.AttrsMain,
    },
    {
      value: "product-banner",
      label: "Try Product",
      attrs: [
        GenericAttrs.AttrsMainWithImage,
        ...GenericAttrs.getAttrsButton(1),
        ...GenericAttrs.getAttrsButton(2),
      ],
    },
    {
      value: "disclaimer",
      label: "Disclaimer",
      attrs: GenericAttrs.AttrsContent,
    },
  ],
}

export default DoctorConstants
