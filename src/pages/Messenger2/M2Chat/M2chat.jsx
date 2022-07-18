import React, { useContext,useEffect, useState ,useRef} from 'react'
import { AuthContext } from '../../../context/AuthContext'
import axios from '../../../axios';
import { io } from "socket.io-client";

import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from "react-router-dom";
import {format} from "timeago.js";
import './m2chat.css'
import M2message from './M2message/M2message';
import { useOutletContext } from "react-router-dom";

function M2Chat({conversID, setConversID}){
  const socket = useRef();
  
    const [conid , setConid] = useState();
    const navigate = useNavigate();
    const [conversationDetail,setConversationDetail] = useState(null)
    let {id} = useParams();
  const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const {user} = useContext(AuthContext);
   
    const [onlineUsers, setOnlineUsers] = useState([])

    const scrollRef = useRef(); // used to scroll to the most recent message by default
    //Fetching all conversation of a user 

   const [arrivalMessage, setArrivalMessage] = useState();
   const [arrivalMessageData, setArrivalMessageData] = useState(null);
const [comingMessage,setComingMessage]= useState()
var md ;
if(socket.current){
  socket.current.on("getMessage", (data) =>{ // executes whene the a new message arrives
    setArrivalMessageData({ fromSelf: false, message: data });
    setArrivalMessage({
      sender: data.senderId,
      text: data.text,
      createdAt: Date.now()
    });
 md = data
    console.log("arrived mess",data);

  })
}
// this is used to fetch messages from the database accoding to the conversatin iod
useEffect(()=>{
  if(user){
    //socket.current = io("ws://localhost:8900");
    
    socket.current = io("https://hahu-chat-app-socket.herokuapp.com/")

    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", users=>{
        setOnlineUsers(user.followings.filter((f)=> users.some((u) => u.userId == f)))
        // console.log("from socket io",users)
      })
  }
 
},[user])  
useEffect(()=>{
  //ws://localhost:8900
 // socket.current = io("https://hahu-chat-app-socket.herokuapp.com/");
 //console.log(socket.current)
  
    if(socket.current){
      socket.current.on("getMessage", (data) =>{ // executes whene the a new message arrives
       
        console.log("arrived mess",data);
        setArrivalMessageData({ fromSelf: false, message: data });
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now()
        });
     md = data
      })
   
     console.log("socket Event")  
    }
},[socket])
//console.log("message",messages);

useEffect(()=>{
  console.log("new message setd")

  arrivalMessage &&
  conversationDetail?.members.includes(arrivalMessage.sender)&&
  setMessages((prev)=> [...prev, arrivalMessage]);
},[arrivalMessage])

useEffect(()=>{
   console.log("baby",arrivalMessageData);
},[arrivalMessageData])
// useEffect(()=>{
//   socket.current.on("getMessage", data =>{ // executes whene the a new message arrives
//     setArrivalMessage({
//        sender: data.senderId,
//        text: data.text,
//        createdAt: Date.now()
//     })
//     console.log("socket Message event");
//    }) 
//    console.log("socket Event")  
// })

// useEffect(()=>{
//       socket.current.emit("addUser", user._id);
//       socket.current.on("getUsers", users=>{
//           setOnlineUsers(user.followings.filter((f)=> users.some((u) => u.userId == f)))
//           // console.log("from socket io",users)
//         })
//   },[user])

   useEffect(()=>{
    const getMessage = async () =>{
        try{
           const res = await axios.get("/messages/"+ conversID);
            setMessages(res.data);
        }catch(err){
            console.log(err)
        }
    }
    getMessage()
  },[])
   useEffect(()=>{
    const getConversationDetail = async ()=>{
      try{
          const res = await axios.get("/conversations/convid/" + conversID);
          setConversationDetail(res.data)
      }catch(err){
        console.log(err)
      }
  }
  getConversationDetail();
      
   },[conversID])


const handleMessageSubmit = async (e) =>{
  e.preventDefault();
  const message = {
      sender: user._id,
      text: newMessage,
      conversationId: conversationDetail._id,
  };
  const receiverId = conversationDetail.members.find(member=> member !==user._id)
      console.log("...........");
    
      console.log(receiverId);
      socket.current.emit("sendMessage",{
          senderId: user._id,
          receiverId,
          text: newMessage,
      })
  try{
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data])
      setNewMessage("")
     
  }catch(err){
      console.log(err)
  }
}
useEffect(()=>{
  scrollRef.current?.scrollIntoView({behavior: "smooth"});
},[messages]);

   return(
      <div className='mess'>
         <div className="gobackArrow">
     
      </div>
      {
                messages.map(m =>(
                    <div key={m._id} ref = {scrollRef}>
                    <M2message  message={m} own={m.sender === user._id} imgsrc = '' senderId={m.sender}/>
                    </div>
                ))
                
               }

        <div className="chatBoxBotton">
                   <textarea className='chatMessageInput'  placeholder='Write Something..' onChange={(e) => setNewMessage(e.target.value) } value = {newMessage}></textarea>
                   <button className='chatSubmitButton' onClick={handleMessageSubmit}><SendIcon color="primary"/></button>
               </div>
      </div>
   )
}
function M2chatList() {
  const navigate = useNavigate();

  return (
    <div className='ChatScreen'>
         <div className="gobackArrow">
      <ArrowBackIcon fontSize="large" onClick={() => navigate(-1)} />
      [conversationDetail]
      </div>

      <div>
       <M2message/>
     
      </div>
   
      </div>
  )
}

export default M2Chat