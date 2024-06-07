import GenericAttrs from "./generic"

const VitaminConstants = {
  SUBS: [
    {
      value: "vitamin-main",
      label: "What is IV Vitamin Therapy",
      attrs: [
        GenericAttrs.AttrsMain,
        ...GenericAttrs.getAttrsButton(1),
        ...GenericAttrs.getAttrsButton(2),
      ],
    },
    {
      value: "vitamin-revitalizing",
      label: "Revitalizing Health",
      attrs: GenericAttrs.AttrsMainWithImage,
    },
    {
      value: "vitamin-treat-what",
      label: "Treat What",
      attrs: GenericAttrs.AttrsMain,
    },
    {
      value: "vitamin-advantage",
      label: "IV Therapy Advantages",
      attrs: GenericAttrs.AttrsMainWithImage,
    },
    {
      value: "vitamin-infusion",
      label: "Infusions",
      attrs: GenericAttrs.AttrsMainWithImage,
    },
  ],
}

export default VitaminConstants
