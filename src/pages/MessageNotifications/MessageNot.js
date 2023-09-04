import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../../axios'
import Rightbar from '../../components/Rightbar/Rightbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import { UserContext } from '../../contexts/UserContext'
import {format} from "timeago.js";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system'

import ChatIcon from '@mui/icons-material/Chat';
import { Alert, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'
function MessageNot() {
    const {userData,unreadMessageCount} = useContext(UserContext)
    const [messageNotification, setMesssageNotififcation]= useState()
    const {user:authUser} = useSelector((state)=> state.auth)
   const [loading,setLoading] = useState(true);
    useEffect(()=>{
      const getUnreadMessageCount=async()=>{
        const config ={
          headers:{
              Authorization: `Bearer ${authUser.token}`
          }
      }
        try{
          const res = await axios.get(`/api/messages/get-unread-message-count/${authUser._id}`,config);
           console.log(res.data.unreadMessages)
          setMesssageNotififcation(res.data.unreadMessages.sort((p1,p2)=>{
            return new Date(p2.createdAt)-new Date(p1.createdAt);
          }))
          setLoading(false)
        }catch(err){
          setLoading(false)
        }
      }
      getUnreadMessageCount()
    },[])
  return (
    <Box className='homeContainer'>
        <Sidebar/>
      <Box style={{flex: 4}}>
           <Box sx={{padding: "10px"}}>  <Typography gutterBottom variant="h6" component="div">
           Message Notifications
        </Typography> 
        </Box>
  
  
{
  loading ?
  <Box sx={{height:'100vh',display:"flex" , alignItems: 'center', justifyContent:"center"}}>
   <CircularProgress/>
</Box>:
<>

{
          messageNotification?.length !=0 ?
<>
{
            messageNotification?.map((mn)=>(
               <Link to={`/chatpage/${mn.conversationId}`}>
                <Box key={mn._id}>
            
               <Card sx={{ maxWidth: 445,margin:"30px" }} >
      {/* <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      /> */}
      {/* {
                    mn.status==="unread"?<p>new</p>:""
                } */}
      <CardContent sx={{backgroundColor:mn.status==="unread"? "lightblue":""}}>
        <Typography gutterBottom variant="h6" component="div">
        <ChatIcon/>{mn.desc}:
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {mn.text}
        </Typography>
        <p>    {format(mn.createdAt)} </p>
      </CardContent>
      
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
                </Box>
                </Link>
            ))
           }
           
</>
          :
          <Box sx={{height:'100vh',display:"flex" , alignItems: 'center', justifyContent:"center"}}>
     

          <Card sx={{ maxWidth: 345 }}>
       
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            ሃሁ Chat👻
            </Typography>
            <Typography variant="body2" color="text.secondary">
            <Alert severity="info"> No New Messages yet, Start conversaiton with some friends !!</Alert>
     
           
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
    </Box>
  )
}

export default MessageNot