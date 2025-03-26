import {
  Streamlit,
  withStreamlitConnection,
  ComponentProps,
} from "streamlit-component-lib"
import React, { useEffect, useMemo, useState, ReactElement } from "react"
import { D2 } from "@terrastruct/d2"


function D2Diagram({ args, disabled, theme }: ComponentProps): ReactElement {
  const { input = "y->z", compileOptions, renderOptions } = args

  // States
  const [svg, setSvg] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [errorFlag, setErrorFlag] = useState(false)
  const [errorMsg, setError] = useState("")


  const style: React.CSSProperties = useMemo(() => {
    if (!theme) return {}

    const borderStyling = `1px solid ${theme.primaryColor || "gray"}`
    return { border: borderStyling, outline: borderStyling }
  }, [theme])

  // Build diagrams
  useEffect(() => {
    const fetchDiagram = async () => {
      const d2 = new D2()
      // setLoading(true) // There is something on the screen at this point
      try {
        const result = await d2.compile(input, compileOptions)
        const renderedSvg = await d2.render(result.diagram, renderOptions)
        setSvg(renderedSvg)
        setErrorFlag(false)
        setLoading(false)
        Streamlit.setFrameHeight()

      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("An unknown error occurred")
        }
        setSvg("<div>ERROR</div>") // Clear the SVG
        setErrorFlag(true)
        setLoading(false)
        Streamlit.setFrameHeight()
      }
    }

    fetchDiagram()
  }, [input, compileOptions, renderOptions])

  // Outputs
  // useEffect(() => {
  //   Streamlit.setComponentValue(input)
  // }, [input])

  // Resize the iframe
  useEffect(() => {
    Streamlit.setFrameHeight()
  }, [style, theme, input, compileOptions, renderOptions])

  return (
    <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : errorFlag ? (
          <div>
            <span>Error rendering diagram</span>
            <span>{errorMsg}</span>
          </div>
        ) : (
          <div>
            <div dangerouslySetInnerHTML={{ __html: svg }} />
          </div>
        )}
    </div>
  )
}

export default withStreamlitConnection(D2Diagram)
