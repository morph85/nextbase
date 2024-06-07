import Image from "next/image"

const BaseImage = (props: any) => {
  const styleWidth = props.hasOwnProperty("styleWidth") && props.styleWidth
  let _props = {
    ...props,
  }
  if (_props.hasOwnProperty('styleWidth')) { // to prevent unrecognized props inside <Image />
    delete _props.styleWidth
  }
  return (
    <Image
      src={props.src}
      alt={props.alt || ""}
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: styleWidth || "100vw", height: "auto" }}
      {..._props}
    />
  )
}

export default BaseImage
