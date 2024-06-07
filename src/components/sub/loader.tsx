import * as React from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"

const Loader = (props: any) => {
  const { loaderTop } = props
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        // alignItems: 'center',
        justifyContent: "center",
        opacity: 0.5,
        backgroundColor: "black",
      }}
    >
      <CircularProgress sx={{ marginTop: loaderTop || "15vw" }} />
    </Box>
  )
}

export default Loader
