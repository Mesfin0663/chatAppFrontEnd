import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../../axios'
import Rightbar from '../../components/Rightbar/Rightbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import { UserContext } from '../../contexts/UserContext'
import {format} from "timeago.js";
import { SocketContext } from '../../contexts/SocketContext'
import OnlinePeople from './OnlinePeople'
import Followers from './Followers'

import {Box, Container,Alert} from '@mui/material'
import { CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
function Friends() {
  const { onlineUsers,socket
    
  } = useContext(SocketContext)
  const [onlineFriends, setOnlineFriends] = useState([])
  const {userData} = useContext(UserContext)
  useEffect(()=>{
         

          
    // setOnlineFriends(user?.followings.filter((f)=> onlineUsers.some((u) => u.userId == f)))
setOnlineFriends(onlineUsers?.filter((u)=> userData?.followings.some((f)=>f ===u.userId)))
  },[onlineUsers])
  return (
    <div className="homeContainer" style={{  height: "100%"}}>

      <Sidebar/>
      <Box style={{flex:"4.5"}} >
      
      {
                

        userData?
        <Box >
          <Grid container spacing={2}  sx={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", }}>
  <Grid item xs={12} sm={12}  sx={{  display:"flex", alignItems:"center", justifyContent:"center", }}>
  <Card sx={{ maxWidth: 400 }} >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Online Friends
          </Typography>
          {
          onlineFriends.length!==0 ?
   onlineFriends?.map(o =>(
    <div key={o.userId} onClick={()=>{

      // callUser(o.socketId)
      }} >
      <OnlinePeople onlineUser={o} />
    </div>
)):
<Box sx={{display:"grid" , alignItems: 'center', justifyContent:"center"}}>
     


  <Typography variant="body2" color="text.secondary">
  <Alert severity="info"> No Onlinne Friend</Alert>

  ሃሁ Chat👻
  </Typography>

</Box>
        }
        </CardContent>
    </Card>

      
  </Grid>
  <Grid item xs={12} sm={12}  sx={{ width:"100%", display: {xs:"grid",lg:"flex", gap:"20"}, alignItems:"flex-start", justifyContent:"center", }}>

  <Card sx={{ maxWidth: 400 ,margin:"5px" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Followers
          </Typography>
          {
          userData?.followers.length !==0 ? 
          userData.followers.map((f)=>(
            <div key={f.userId} onClick={()=>{

              // callUser(o.socketId)
              }} >
              <Followers follower={f} />
            </div>
          )):

          <Box sx={{display:"grid" , alignItems: 'center', justifyContent:"center"}}>
     


  <Typography variant="body2" color="text.secondary">
  <Alert severity="info"> You don't have followers yet </Alert>

  ሃሁ Chat👻
  </Typography>

</Box>
        }
        </CardContent>
    </Card>
    <Card sx={{ maxWidth: 345 ,margin:"5px" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Followings
          </Typography>
          {
          userData?.followings.length !==0 ? 
          userData.followings.map((f)=>(
            <div key={f.userId} onClick={()=>{

              // callUser(o.socketId)
              }} >
              <Followers follower={f} />
            </div>
          )):
          <Box sx={{display:"grid" , alignItems: 'center', justifyContent:"center"}}>
     


  <Typography variant="body2" color="text.secondary">
  <Alert severity="info">You are not folloiwng anyone yet</Alert>

  ሃሁ Chat👻
  </Typography>

</Box>
        }
        </CardContent>
    </Card>
    
  </Grid>
 

</Grid>
       
          
        </Box>

        
        :
        <Box sx={{height:'100vh',display:"flex" , alignItems: 'center', justifyContent:"center"}}>
   <CircularProgress/>
</Box>
      }

<Box sx={{ display: { xs:"none",sm: "none", md: "block" } ,flex:"4",maxWidth:"400px"}}>
     

        </Box>
</Box>
    <Box sx={{ display: { xs:"none",sm: "none", md: "block" } ,flex:"2"}}>
    <Rightbar/>

    </Box>
    
    </div>

 
  )
}

export default Friends