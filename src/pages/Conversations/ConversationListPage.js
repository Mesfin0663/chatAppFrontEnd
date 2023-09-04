import React, { useContext, useState,useRef, useEffect } from 'react'
import { Route, Routes,Link,NavLink } from 'react-router-dom'

import MessagePage from './MessagePage'
import {Conversations} from './DummyConversationData'
import { UserContext } from '../../contexts/UserContext';
import {useSelector, useDispatch} from 'react-redux'
import { SocketContext } from '../../contexts/SocketContext'
import axios from '../../axios'
import SingleConversation from './SingleConversation'
import { Box, CircularProgress, Container } from '@mui/material'
import { useLocation } from 'react-router-dom';

function ConversationListPage() {
  const location = useLocation();
  console.log(location);
    let activeStyle = {
        textDecoration: "underline",
        backgroundColor:"lightblue"
      };
    
    const { onlineUsers:AllOnlineUsers
    
    } = useContext(SocketContext)
  const [conversations, setConversations] = useState([]);

  const {user:authUser} = useSelector((state)=> state.auth)
  const {userData: user,windowsize} = useContext(UserContext)
  const {socket} = useContext(UserContext)
   const [loading,setLoading] = useState(true)
  const [onlineUsers, setOnlineUsers] = useState([])
  const scrollRef = useRef(); // used to scroll to the most recent message by default
  //Fetching all conversation of a user 
const PF = process.env.VITE_REACT_APP_PUBLIC_FOLDER;

 const [arrivalMessage, setArrivalMessage] = useState(null);
 useEffect(()=>{
    const getConversations = async ()=>{
        const config ={
            headers:{
                Authorization: `Bearer ${authUser.token}`
            }
        }
        try{
            console.log("tetching conversaiton")
            const res = await axios.get("/api/conversations/get-allconversations/" + authUser?._id,config);
            
            setConversations(res.data)
            setLoading(false)
        }catch(err){
          console.log(err)
          setLoading(false)
        }
    }
    getConversations();

},[authUser])
  return (
    <div>
     
    {
        loading?
        <>
        {
         location.pathname === "/conversations" ? 
        <Box sx={{height:'100vh',display:"flex" , alignItems: 'center', justifyContent:"center"}}>
        <CircularProgress/>
     </Box>
     :""
        }
        </>
     :
     
          <Box    sx={{   display: "flex",
          justifyContent: "space-between"}}>
        <Box position="fixed" sx={{width:"200px",    overflowY: "scroll",height:"100vh"
  }} >
        <input placeholder='Conversations' type="text" className="chatMenuInput" />
              {
            <Box sx={{flex:".5",Overflow:" Auto",}}>
                {
 conversations.map((con)=>(
    <NavLink to={`/conversations/${con._id}`} key={con._id}   style={({ isActive }) =>
    isActive ? activeStyle : undefined
  }>

   <SingleConversation conversation={con} currentUser= {user}/>
     </NavLink>
))
                }
 
            </Box>
         
         }
      
        </Box>
        
{
  location.pathname === "/conversations" ? 
  <Box sx={{ display: { xs:"none",sm: "none", md: "block" }, marginLeft:"400px"}} >
                        <span className='noConversationText'>Open a conversation to start a chat</span>
                            </Box>:""
}
      </Box>
       
    }
   
    </div>
  )
}

export default ConversationListPage
