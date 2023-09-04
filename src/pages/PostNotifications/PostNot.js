import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../../axios'
import Rightbar from '../../components/Rightbar/Rightbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import { UserContext } from '../../contexts/UserContext'
import {format} from "timeago.js";
import { Mail, Notifications, Pets } from "@mui/icons-material";


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system'

import {Alert, CircularProgress} from '@mui/material'


function PostNot() {
    const [postNotification, setPostNotififcation]= useState()
    const {user:authUser} = useSelector((state)=> state.auth)
    const [loading, setLoading] =useState(true)
    useEffect(()=>{
        const getPostNotifications=async()=>{
          try{
            const res = await axios.get(`/api/notifications/get-post-notifications/${authUser._id}`);
            if(res.data){
              await axios.post(`/api/notifications/make-post-read/${authUser._id}`);

                
            }
            setPostNotififcation(res.data.sort((p1,p2)=>{
                return new Date(p2.createdAt)-new Date(p1.createdAt);
              }))
           setLoading(false)
          }catch(err){
            setLoading(false)

          }
        }
        getPostNotifications()
    },[])
  return (
    <div className='homeContainer'>
        <Sidebar/>
      <Box style={{flex: 5}}>
      <Typography gutterBottom variant="h5" component="div">
      Post Alerts
        </Typography>
      {
        loading ?
        <Box sx={{height:'100vh',display:"flex" , alignItems: 'center', justifyContent:"center"}}>
        <CircularProgress/>
     </Box>
        :
        <>
           {
          postNotification?.length !=0?
<>
{
            
            postNotification?.map((mn)=>(
                <div key={mn._id}>
             
         
               
               <Card sx={{ maxWidth: 445,margin:"30px" }} >
      {/* <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      /> */}
      <CardContent  sx={{backgroundColor:mn.status==="unread"? "lightblue":""}}>
        <Typography gutterBottom variant="h6" component="div">
        <Notifications/>{mn.desc}:
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {mn.content}
        </Typography>
        <p>  {format(mn.createdAt)} </p>
      </CardContent>
      
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
                </div>
            ))
           }
</>:
 <Box sx={{height:'100vh',display:"flex" , alignItems: 'center', justifyContent:"center"}}>
     

     <Card sx={{ maxWidth: 345 }}>
  
     <CardContent>
       <Typography gutterBottom variant="h5" component="div">
       ሃሁ Chat👻
       </Typography>
       <Typography variant="body2" color="text.secondary">
       <Alert severity="info"> No posts yet, Follow some friends !!</Alert>

      
       </Typography>
     </CardContent>
   
   </Card>
     </Box>
        }
        </>
      }
     
   
         
      </Box>
      <Box sx={{display:{xs:'none' , sm:"none", md:"block"}, maxWidth:"400px"}}>
      <Rightbar/>

      </Box>
    </div>
  )
}

export default PostNot