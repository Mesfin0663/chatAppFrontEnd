import React, { useContext, useEffect,useRef,useState } from 'react'
import { Routes, Route, useParams, Link } from 'react-router-dom';
import axios from '../../axios';
import ConversationListPage from './ConversationListPage';

import { UserContext } from '../../contexts/UserContext';
import {useSelector, useDispatch} from 'react-redux'
import { SocketContext } from '../../contexts/SocketContext'
import SingleConversation from './SingleConversation'
import { Box, CircularProgress, Container, Paper } from '@mui/material'
import Message from '../../components/message/Message';
import SendIcon from '@mui/icons-material/Send';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatOnline from '../../components/ChatOnline/ChatOnline';

import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

function MessagePage() {
    const {user:authUser} = useSelector((state)=> state.auth)
    const [conversation, setConversation] = useState();
    const [loading,setLoading] = useState(true)
    const [onlineUsers, setOnlineUsers] = useState([])
    const {userData:user} = useContext(UserContext)

    const [messages, setMessages] = useState();
    const [newMessage, setNewMessage] = useState("");
    const scrollRef = useRef(); // used to scroll to the most recent message by default
    //Fetching all conversation of a user 
  const PF = process.env.VITE_REACT_APP_PUBLIC_FOLDER;
  
   const [arrivalMessage, setArrivalMessage] = useState(null);
    const { onlineUsers:AllOnlineUsers
    
    } = useContext(SocketContext)
    const {socket} = useContext(UserContext)

    let { convid } = useParams();
console.log(convid)
useEffect(()=>{
    const getConversations = async ()=>{
        const config ={
            headers:{
                Authorization: `Bearer ${authUser.token}`
            }
        }
        try{
            console.log("fetching Messages")
            const res = await axios.get("/api/conversations/get-conversation/" + convid,config);
            
            setConversation(res.data)
        }catch(err){
          console.log(err)
        }
    }
    getConversations();

},[convid])
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
    setOnlineUsers(user?.followings.filter((f)=> AllOnlineUsers.some((u) => u.userId == f)))
    // console.log(AllOnlineUsers)

    // socket.on("getUsers", users=>{
    // })
},[AllOnlineUsers,user?.followings])
useEffect(()=>{
    arrivalMessage &&
    conversation?.members.includes(arrivalMessage.sender)&&
    setMessages((prev)=> [...prev, arrivalMessage]);

},[arrivalMessage, conversation])
useEffect(()=>{
    const getMessage = async () =>{
        const config ={
            headers:{
                Authorization: `Bearer ${authUser.token}`
            }
        }
        try{
           const res = await axios.get("/api/messages/get-messages/"+ conversation?._id ,config);
            setMessages(res.data);
            console.log(res.data)
            setLoading(false)
        }catch(err){
            console.log(err)
        }
    }
    getMessage()
},[conversation?._id])

const handleMessageSubmit = async (e) =>{
    e.preventDefault();
    const config ={
        headers:{
            Authorization: `Bearer ${authUser.token}`
        }
    }
    const receiverId = conversation.members.find(member=> member !==authUser._id)

    const message = {
        sender: authUser._id,
        senderName: authUser.username,
        text: newMessage,
        receiver:receiverId,
        conversationId: conversation._id,
    };
   
    try{
        const res = await axios.post("/api/messages/create", message,config);
        setMessages([...messages, res.data])
        setNewMessage("")
        const receiverId = conversation.members.find(member=> member !==authUser._id)
        socket.emit("sendMessage",{
            senderId: authUser._id,
            receiverId,
            text: newMessage,
            senderName: authUser.username
        })
    }catch(err){
        console.log(err)
    }
}
console.log(messages)
useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior: "smooth"});
},[messages]);
  return (
    <>
    {
        loading ?
        <Box sx={{height:'100vh',display:"flex" , alignItems: 'center', justifyContent:"center"}}>
        <CircularProgress/>
     </Box>:
       <Container sx={{display:"flex"}}>

        
       <Box sx={{display:{xs:"none" ,sm:"none",md:"block"}}}>
       <ConversationListPage/>

       </Box > 

   

     <Box  className="" sx={{width:{lg:"500px",xs:"300px"}, marginLeft:{xs:"20px", sm:"200px", md:"300px"}}}>
           <div className="">
           {
                       conversation? <>
              <div className="chatBoxTop">   
              {
 messages?.length !=0?
 <Box sx={{flex:"5"}}>
 
 {
   
  messages?.map(m =>(
      <div key={m._id} ref = {scrollRef}>
      <Message  message={m} own={m.sender === authUser._id} imgsrc = '' senderId={m.sender}/>
      </div>
  ))
 }
 </Box>
 :
 <Box  className="chatBox" sx={{ xs:"10px"}}>
 <div>Write Something</div>
 </Box>
              } 
              
 {/* <div className="chatBoxBottom">    

               <Link to="/videochat">
               <PhoneIcon  color="primary"/>

               </Link>
                  <textarea className='chatMessageInput'  placeholder='Write Something..' onChange={(e) => setNewMessage(e.target.value) } value = {newMessage}    onKeyPress={
                 event => {
                   if (event.key === 'Enter') {
                       handleMessageSubmit(event)
                   }
                 }
                 }></textarea>
                  <button className='chatSubmitionButton' onClick={handleMessageSubmit}><SendIcon color="primary"/></button>
              </div> */}
            
              </div>
            
                       </>: <Box sx={{ display: { xs:"none",sm: "none", md: "block" }}} >
                       <span className='noConversationText'>Open a conversation to start a chat</span>
                           </Box>
                   }
               
           </div>
       </Box>
 
     <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
       <BottomNavigation
         showLabels
         value={""}
         onChange={(event, newValue) => {
         }}
       >
       <div className="chatBoxBottom">    

<Link to="/videochat">
<PhoneIcon  color="primary"/>

</Link>
  <textarea className='chatMessageInput'  placeholder='Write Something..' onChange={(e) => setNewMessage(e.target.value) } value = {newMessage}    
  onKeyPress={
 event => {
   if (event.key === 'Enter') {
       handleMessageSubmit(event)
   }
 }
 }></textarea>
  <button className='chatSubmitionButton' onClick={handleMessageSubmit}><SendIcon color="primary"/></button>
</div>
       </BottomNavigation>
     </Paper>


    
       <Box sx={{ display: { xs:"none",sm: "none", md: "block" }}} >
           <div className="chatOnlineWrapper">
       
               <ChatOnline onlineUsers={onlineUsers} currentId = {authUser?._id} />
      

           </div>
       </Box>
   </Container>
    }
    </>
  
  )
}

export default MessagePage
