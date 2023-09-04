import { Box, Container } from '@mui/material';
import React from 'react'
import './landing.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function CardComp({title,content,img,actions}) {

  return (
    <div>
     
      <Card sx={{margin:"10px", border:"none"}} xs={4} md={4}> 
            <CardContent sx={{display:"flex"}} >
            <Box sx={{margin:"20px"}}>
        <Typography level="h4" component="h1" sx={{padding:"10px"}}>{title}</Typography>
      {img}
        {content}
        </Box>
            </CardContent>
            <CardActions><Button>{}</Button></CardActions>

        </Card>
    </div>
  )
}

export default CardComp
