import React from 'react'
import { useState, useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from '../../axios'

import {Box, Container,Alert} from '@mui/material'
import { CircularProgress } from '@mui/material';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
function EmailVerify() {
    const [validUrl, setValidUrl] = useState(false)
    const [loading,setLoading] = useState(true)
    const [response,setResponse]= useState()
    const params = useParams()
    useEffect(()=>{
        const getAllSongs= async()=>{
          try{
           const res = await axios.get(`/api/users/${params.id}/verify/${params.token}`)
            console.log(res)
            setResponse(res.data)
            setLoading(false)
            setValidUrl(true)
          }catch(err){
            setLoading(false)
         console.log(err)
          }
        }
        getAllSongs()
     },[])
     console.log(response?.message)
    return (
    <Container>
{
   loading? <Box sx={{height:'100vh',display:"flex" , alignItems: 'center', justifyContent:"center"}}>
   <CircularProgress/>
</Box>: 
     validUrl?
     response.message =="verified"?
     <Box sx={{height:'100vh',display:"flex" , alignItems: 'center', justifyContent:"center"}}>
     

      <Card sx={{ maxWidth: 345 }}>
   
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          HaHu Chat👻
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <Alert severity="info"> Email has already been verified</Alert>

       
        </Typography>
      </CardContent>
      <CardActions>
        <Link to="/login">
        <Button size="small">Login</Button>
      
        </Link>
      </CardActions>
    </Card>
      </Box>:
      
      <Box sx={{display:"flex" , alignItems: 'center', justifyContent:"center"}}>
      <Card sx={{ maxWidth: 345 }}>
   
   <CardContent>
     <Typography gutterBottom variant="h5" component="div">
       HaHu Chat
     </Typography>
     <Typography variant="body2" color="text.secondary">
     <Alert severity="success">Email Verified Successfully !!</Alert>

    
     </Typography>
   </CardContent>
   <CardActions>
     <Link to="/login">
     <Button size="small">Login</Button>
   
     </Link>
   </CardActions>
 </Card>
     </Box>:
     <Box sx={{display:"flex" , alignItems: 'center', justifyContent:"center"}}>
  <Card sx={{ maxWidth: 345 }}>
   
   <CardContent>
     <Typography gutterBottom variant="h5" component="div">
       HaHu Chat
     </Typography>
     <Typography variant="body2" color="text.secondary">
     <Alert severity="error">404 Error Not Found!</Alert>

     </Typography>
   </CardContent>
   <CardActions>
     <Link to="/login">
     <Button size="small">Login</Button>
   
     </Link>
   </CardActions>
 </Card>     </Box> 
}
    </Container>
  )
}

export default EmailVerify