import React, { useContext, useState,useRef } from 'react'
import Toolbar from '../../components/Toolbar/Toolbar'
import { AuthContext } from '../../context/AuthContext'
import Conversations from '../../components/Conversations/Conversations';
import Message from '../../components/message/Message';
import ChatOnline from '../../components/ChatOnline/ChatOnline';
import { useEffect } from 'react';
import axios from '../../axios';
import { io } from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import SendIcon from '@mui/icons-material/Send';

import './messenger.css';

function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState({});
    const [newMessage, setNewMessage] = useState("");
    const {user} = useContext(AuthContext);
    const [onlineUsers, setOnlineUsers] = useState([])
    const scrollRef = useRef(); // used to scroll to the most recent message by default
    //Fetching all conversation of a user 

   const [arrivalMessage, setArrivalMessage] = useState(null);
   const socket = useRef()
   useEffect(()=>{
    //ws://localhost:8900
    socket.current = io("https://hahu-chat-app-socket.herokuapp.com/")
    socket.current.on("getMessage", data =>{ // executes whene the a new message arrives
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
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", users=>{
            setOnlineUsers(user.followings.filter((f)=> users.some((u) => u.userId == f)))
        })
    },[user])
   console.log(onlineUsers);
    // Fetches all conversations that a single user participates in
    useEffect(()=>{
        const getConversations = async ()=>{
            try{
                const res = await axios.get("/conversations/" + user._id);
                setConversations(res.data)
            }catch(err){
              console.log(err)
            }
        }
        getConversations();

    },[user._id])
// this is used to fetch messages from the database accoding to the conversatin iod
    useEffect(()=>{
        const getMessage = async () =>{
            try{
               const res = await axios.get("/messages/"+ currentChat?._id);
                setMessages(res.data);
            }catch(err){
                console.log(err)
            }
        }
        getMessage()
    },[currentChat])

    const handleMessageSubmit = async (e) =>{
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };
       
        try{
            const res = await axios.post("/messages", message);
            setMessages([...messages, res.data])
            setNewMessage("")
            const receiverId = currentChat.members.find(member=> member !==user._id)
            socket.current.emit("sendMessage",{
                senderId: user._id,
                receiverId,
                text: newMessage,
            })
        }catch(err){
            console.log(err)
        }
    }

   

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    },[messages]);
  return (

    <>
  <Toolbar username ={user.username}/>
      <div className="messenger">
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input placeholder='Conversations' type="text" className="chatMenuInput" />
               {
                conversations.map((c)=>(
                    <div key={c._id} onClick ={()=> setCurrentChat(c)}>
                    <Conversations  conversation={c} currentUser= {user}/>
                   </div>
                ))
               }
            </div>
        </div>
        <div className="chatBox">
            <div className="chatBoxWrapper">
            {
                        currentChat? <>
               <div className="chatBoxTop">    
               {
                messages.map(m =>(
                    <div key={m._id} ref = {scrollRef}>
                    <Message  message={m} own={m.sender === user._id} imgsrc = '' senderId={m.sender}/>
                    </div>
                ))
               }
               </div>
               <div className="chatBoxBottom">
                   <textarea className='chatMessageInput'  placeholder='Write Something..' onChange={(e) => setNewMessage(e.target.value) } value = {newMessage}></textarea>
                   <button className='chatSubmitionButton' onClick={handleMessageSubmit}><SendIcon color="primary"/></button>
               </div>
                        </>: <span className='noConversationText'>Open a conversation to start a chat</span>
                    }
                
            </div>
        </div>
        <div className="chatOnline">
            <div className="chatOnlineWrapper">
            
                <ChatOnline onlineUsers={onlineUsers} currentId = {user._id} setCurrentChat={setCurrentChat}/>
       

            </div>
        </div>
      </div>
    
    </>

  )

}

export default Messenger