"use client"

import { createTheme } from "@mui/material/styles"

// Augment the palette to include an ochre color
declare module "@mui/material/styles" {
  interface Palette {
    hillbright: Palette["primary"]
    hilldark: Palette["primary"]
  }

  interface PaletteOptions {
    hillbright?: PaletteOptions["primary"]
    hilldark?: PaletteOptions["primary"]
  }
}

// Update the Button's color options to include an ochre option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    hillbright: true
    hilldark: true
  }
}

export const COLOR_BRIGHT = "#E2E4D9"
export const COLOR_BRIGHT_LESS = "#878882"
export const COLOR_DARK = "#2d382e"
export const COLOR_DARK_MORE = "#283229"

export const sxTextContent = {
  ['& p']: {
    mt: 2,
  },
  ['& ul li']: {
    listStyleType: 'disc',
    ml: 3,
  },
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 992,
      lg: 1200,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: COLOR_BRIGHT,
      light: COLOR_BRIGHT,
      dark: COLOR_DARK,
      contrastText: COLOR_BRIGHT,
    },
    hillbright: {
      main: "#000000",
      light: "#ccddee",
      dark: COLOR_DARK,
      contrastText: "#ccddee",
    },
    hilldark: {
      main: COLOR_DARK,
      light: COLOR_BRIGHT,
      dark: "#000000",
      contrastText: COLOR_BRIGHT,
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& .MuiRadioGroup-root .MuiButtonBase-root": {
            color: COLOR_BRIGHT,
          },

          "& input::-webkit-calendar-picker-indicator": {
            filter: "invert(1)",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: COLOR_BRIGHT_LESS,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: COLOR_BRIGHT,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // root: {
        //   '&:-webkit-autofill': {
        //     WebkitBoxShadow: '0 0 0 100px #307ECC inset',
        //     WebkitTextFillColor: 'ffffff',
        //   },
        // },
        notchedOutline: {
          borderColor: 'transparent',
          backgroundColor: 'rgba(0,0,0,0.2)',
        },
        // notchedOutline: { // base
        //   "&": {
        //     borderColor: 'transparent',
        //     backgroundColor: 'rgba(0,0,0,0.2)',
        //   },
        // },
        // root: {
        //   "& > .MuiSelect-nativeInput ~ .MuiOutlinedInput-notchedOutline": {
        //     backgroundColor: 'rgba(0,0,0,0.2)',
        //   },
        // },
        input: {
          color: COLOR_BRIGHT,
          "&[type=text], &.MuiSelect-nativeInput": {
            color: COLOR_BRIGHT,
          },
          // "&[type=text] ~ .MuiOutlinedInput-notchedOutline, &[type=date] ~ .MuiOutlinedInput-notchedOutline": {
          //   backgroundColor: 'rgba(0,0,0,0.2)',
          // },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "& .MuiSvgIcon-root": {
            color: COLOR_BRIGHT,
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected, &.Mui-selected:hover": {
            color: "#ffffff",
            backgroundColor: COLOR_DARK,
          },
        },
      },
    },
  },
})

export default theme
