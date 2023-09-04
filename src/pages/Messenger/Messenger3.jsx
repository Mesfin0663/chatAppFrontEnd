import React, { useContext, useState,useRef } from 'react'
import Toolbar from '../../components/Navbar/Navbar'
import Conversations from '../../components/Conversations/Conversations';
import Message from '../../components/message/Message';
import ChatOnline from '../../components/ChatOnline/ChatOnline';
import { useEffect } from 'react';
import axios from '../../axios';
import { io } from "socket.io-client";
// import 'bootstrap/dist/css/bootstrap.min.css';
import SendIcon from '@mui/icons-material/Send';
import {
    BrowserRouter as Router ,

    useNavigate,
    Routes,
    Route,
    Link,
    useLocation
    // Redirect
  } from "react-router-dom";
import './messenger.css';
import { useSelector } from 'react-redux';
import { UserContext } from '../../contexts/UserContext';
import PhoneIcon from '@mui/icons-material/Phone';
import { SocketContext } from '../../contexts/SocketContext';
import { Box, Container } from '@mui/material';
import NextComp from '../Messenger2/NextComp/NextComp';

function Messenger3() {
    const { onlineUsers:AllOnlineUsers
    
      } = useContext(SocketContext)
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState({});
    const [newMessage, setNewMessage] = useState("");
    const {user:authUser} = useSelector((state)=> state.auth)
    const {userData:user} = useContext(UserContext)
    const {socket} = useContext(UserContext)

    const [onlineUsers, setOnlineUsers] = useState([])
    const scrollRef = useRef(); // used to scroll to the most recent message by default
    //Fetching all conversation of a user 
  const PF = process.env.VITE_REACT_APP_PUBLIC_FOLDER;

   const [arrivalMessage, setArrivalMessage] = useState(null);
//    const socket = useRef()
   useEffect(()=>{
    //ws://localhost:8900
    // socket.current = io("https://hahu-chat-app-socket.herokuapp.com/")
    socket.on("getMessage", data =>{ // executes whene the a new message arrives
     setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
     })
    })   
},[])

useEffect(()=>{
    arrivalMessage &&
    currentChat?.members.includes(arrivalMessage.sender)&&
    setMessages((prev)=> [...prev, arrivalMessage]);

},[arrivalMessage, currentChat])

    useEffect(()=>{
        setOnlineUsers(user?.followings.filter((f)=> AllOnlineUsers.some((u) => u.userId == f)))
        // console.log(AllOnlineUsers)

        // socket.on("getUsers", users=>{
        // })
    },[AllOnlineUsers,user?.followings])
//    console.log(onlineUsers);
    // Fetches all conversations that a single user participates in
    useEffect(()=>{
        const getConversations = async ()=>{
            const config ={
                headers:{
                    Authorization: `Bearer ${authUser.token}`
                }
            }
            try{
                const res = await axios.get("/api/conversations/get-allconversations/" + user?._id,config);
                setConversations(res.data)
            }catch(err){
              console.log(err)
            }
        }
        getConversations();

    },[user?._id])
// this is used to fetch messages from the database accoding to the conversatin iod
    useEffect(()=>{
        const getMessage = async () =>{
            const config ={
                headers:{
                    Authorization: `Bearer ${authUser.token}`
                }
            }
            try{
               const res = await axios.get("/api/messages/get-messages/"+ currentChat?._id ,config);
                setMessages(res.data);
            }catch(err){
                console.log(err)
            }
        }
        getMessage()
    },[currentChat])
// console.log(messages)
    const handleMessageSubmit = async (e) =>{
        e.preventDefault();
        const config ={
            headers:{
                Authorization: `Bearer ${authUser.token}`
            }
        }
        const receiverId = currentChat.members.find(member=> member !==user._id)

        const message = {
            sender: user._id,
            senderName: user.username,
            text: newMessage,
            receiver:receiverId,
            conversationId: currentChat._id,
        };
       
        try{
            const res = await axios.post("/api/messages/create", message,config);
            setMessages([...messages, res.data])
            setNewMessage("")
            const receiverId = currentChat.members.find(member=> member !==user._id)
            socket.emit("sendMessage",{
                senderId: user._id,
                receiverId,
                text: newMessage,
                senderName: user.username
            })
        }catch(err){
            console.log(err)
        }
    }

   

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    },[messages]);
  return (

    <Container>
  {/* <Toolbar username ={user?.username}/> */}
 
      <Routes>
      <Route path="" element={     <div className="messenger">
        <Box  className="chatMenu">
            <div className="chatMenuWrapper">
                <input placeholder='Conversations' type="text" className="chatMenuInput" />
               {
                conversations.map((c)=>(
                    <Link to={`/messenger3/next`} key={c._id}>
                     <div  onClick ={()=> setCurrentChat(c)}>
                    <Conversations  conversation={c} currentUser= {user}/>
                   </div>
                    </Link>
                   
                ))
               }
            </div>
        </Box>
      
        <Box sx={{ display: { xs:"none",sm: "none", md: "block" }}} >
            <div className="chatOnlineWrapper">
        
                <ChatOnline onlineUsers={onlineUsers} currentId = {user?._id} setCurrentChat={setCurrentChat}/>
       

            </div>
        </Box>
      </div>}/>
        <Route path="next" element={ <Container> <Box className="chatBox">
            <div className="chatBoxWrapper">
            {
                        currentChat? <>
               <div className="chatBoxTop">    
               {
                messages?.map(m =>(
                    <div key={m._id} ref = {scrollRef}>
                    <Message  message={m} own={m.sender === user._id} imgsrc = '' senderId={m.sender}/>
                    </div>
                ))
               }
               </div>
               <div className="chatBoxBottom">
                
               <Link to="/videochat">
                <PhoneIcon  color="primary"/>

                </Link>
                   <textarea className='chatMessageInput'  placeholder='Write Something..' onChange={(e) => setNewMessage(e.target.value) } value = {newMessage} onKeyPress={
                  event => {
                    if (event.key === 'Enter') {
                        handleMessageSubmit(event)
                    }
                  }
                  }></textarea>
                   <button className='chatSubmitionButton' onClick={handleMessageSubmit}><SendIcon color="primary"/></button>
               </div>
                        </>: <Box sx={{ display: { xs:"none",sm: "none", md: "block" }}} >
                        <span className='noConversationText'>Open a conversation to start a chat</span>
                            </Box>
                    }
                
            </div>
        </Box>
        </Container>
        }/>
    

    </Routes>
    </Container>

  )

}

export default Messenger3