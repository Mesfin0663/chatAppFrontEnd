import { Alert, Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'

function Alerts({alert, alertType}) {
  return (
  
    <Box sx={{height:'100vh',display:"flex" , alignItems: 'center', justifyContent:"center"}}>


<Card sx={{ maxWidth: 345 }}>

<CardContent>
<Typography gutterBottom variant="h5" component="div">
ሃሁ Chat👻
</Typography>
<Typography variant="body2" color="text.secondary">
<Alert severity={alertType}> {alert}</Alert>


</Typography>
</CardContent>

</Card>
</Box>

  )
}

export default Alerts