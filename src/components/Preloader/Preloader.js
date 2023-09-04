import { Box, CircularProgress } from '@mui/material'
import React from 'react'

function Preloader({size}) {
  return (
    <Box sx={{height:'100vh',display:"flex" , alignItems: 'center', justifyContent:"center"}}>
    <CircularProgress size={size}/>
 </Box>
  )
}

export default Preloader