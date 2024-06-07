import * as React from "react"
import Box from "@mui/material/Box"
import Loader from "./loader"

import { useAppStore } from "@/store/app-provider"

// type Props = {
//   loading: boolean,
//   children: any,
// }

const BasePage = (props: any) => {
  const { children, loaderTop, height, center } = props

  const { loadingCount } = useAppStore((state: any) => state)
  const isLoading = loadingCount != null && loadingCount > 0

  return (
    <Box
      sx={{
        width: "100%",
        height: height || "100%",
        position: "relative",
        ...(Boolean(center)
          ? {
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "row",
            }
          : {}),
      }}
      className={`${isLoading ? "no-scrollbar" : ""}`}
      {...props}
    >
      {children}
      {isLoading ? <Loader loaderTop={loaderTop} /> : null}
    </Box>
  )
}

export default BasePage
