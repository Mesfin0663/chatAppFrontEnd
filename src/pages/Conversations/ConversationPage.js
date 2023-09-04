import React, { useContext, useState,useRef, useEffect } from 'react'
import { Route, Routes,Link,NavLink } from 'react-router-dom'

import ConversationListPage from './ConversationListPage'
import MessagePage from './MessagePage'
import {Conversations} from './DummyConversationData'
import { UserContext } from '../../contexts/UserContext';
import {useSelector, useDispatch} from 'react-redux'
import { SocketContext } from '../../contexts/SocketContext'
import axios from '../../axios'
import SingleConversation from './SingleConversation'
import { Box, Container } from '@mui/material'
function ConversationPage() {
    let activeStyle = {
        textDecoration: "underline",
        backgroundColor:"lightblue"
      };
    
    const { onlineUsers:AllOnlineUsers
    
    } = useContext(SocketContext)
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
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
        }catch(err){
          console.log(err)
        }
    }
    getConversations();
setLoading(false)
},[user?._id])

  return (
    <Container >

   
       
     
         <Routes>
           <Route  path="" element={<ConversationListPage />}/>
           <Route  path=":convid" element={<MessagePage  />}/>
   
         </Routes>
   
   
    </Container>
  )
}

export default ConversationPage
