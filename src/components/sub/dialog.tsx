import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
import IconClose from '@mui/icons-material/Close'
import { COLOR_BRIGHT } from '@/app/theme'

type Props = {
  children: any,
  open: boolean,
  setOpen: Function,
  onClose?: Function,
  // meta
  isMiddle?: boolean
  isSmall?: boolean
}

const style = {
  position: 'absolute' as 'absolute',
  top: '0%',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  width: '90%',
  // bgcolor: 'background.paper',
  bgcolor: COLOR_BRIGHT,
  border: '1px solid #000',
  boxShadow: 24,
  // p: 4,
  maxWidth: '1536px',
  my: 4,
  // my: 48,
}

const styleMiddle = {
  top: '50%',
  transform: 'translate(-50%, -50%)',
  my: 0,
}

const styleSmall = {
  width: '90%',
  '@media(min-width: 768px)': {
    width: '80%',
  },
  '@media(min-width: 1024px)': {
    width: '50%',
  },
}

const styleCloseWrapper = {
  px: 8,
  pt: 4,
  pb: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
}

const styleClose = {
  '&:hover': {
    cursor: 'pointer',
  },
}

export default function TransitionsModal (props: Props) {
  const {
    children,
    open,
    setOpen,
    onClose,
    // meta
    isMiddle,
    isSmall,
  } = props

  return (
    <Modal
      // aria-labelledby="transition-modal-title"
      // aria-describedby="transition-modal-description"
      open={open}
      onClose={() => (onClose && onClose() || setOpen(close))}
      closeAfterTransition
      slots={{
        backdrop: Backdrop,
      }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      sx={{
        overflowY: 'scroll',
        py: 16,
      }}
      disableScrollLock={false}
    >
      <Fade in={open}>
        <Box sx={{
          ...style,
          ...(isMiddle ? styleMiddle : {}),
          ...(isSmall ? styleSmall : {}),
        }}>
          <Box sx={styleCloseWrapper}>
            <Box onClick={() => setOpen(false)} sx={styleClose}>
              Close
              <IconClose sx={{ ml: 1 }} />
            </Box>
          </Box>
          {children}
        </Box>
      </Fade>
    </Modal>
  )
}
