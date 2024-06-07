function BaseText(_props: { texts: string[], addBreaks?:boolean } & JSX.IntrinsicElements["p"]) {
  const { texts, addBreaks=true, ...props } = _props

  const result = texts.map((t: string, i: number) => (
    <div key={i}>
      <p>{t}</p>

      {addBreaks && i < texts.length - 1 && <br />}
    </div>
  ))

  return <div {...props}>{result}</div>
}

export default BaseText
