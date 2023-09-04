import { Box, Container } from '@mui/material';
import React from 'react'
import './landing.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardComp from './CardComp';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function Landing() {
    const PF = process.env.REACT_APP_NODE_ENV==='development' ? process.env.REACT_APP_DEV_PUBLIC_FOLDER:process.env.REACT_APP_PROD_PUBLIC_FOLDER;

  return (
    <Container sx={{gap:"40" ,display:{md:"flex", xs:"grid"}, alignItems:"center", justifyContent:"center",textAlign:"center"}} >
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}  sx={{alignItems:"center", justifyContent:"center",textAlign:"center"}}>
        <Grid item xs={12} sm={6} md={4} sx={{maxWidth:"400px" }}>
        <CardComp title="Welcome to HaHu Chat👻" img={  <img  className='img1'  src={PF+"chatOne.svg"}/>}/>

        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{maxWidth:"400px"}}>
        <CardComp title="Chat real-time" img={  <img className='img1' src={PF+"landingPage/real-time.svg"}/>} />
        </Grid>
        <Grid item xs={12} sm={6}  md={4} sx={{maxWidth:"400px"}}>
        <CardComp title="Login and start chating" img={         <img className='img1' src={PF+"landingPage/startChat2.svg"}/>
} />

        </Grid>
      
      </Grid>
    </Box>
      
    </Container>
  )
}

export default Landing
