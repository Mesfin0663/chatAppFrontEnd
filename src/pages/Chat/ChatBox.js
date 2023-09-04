import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from '../../axios';
import {format} from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import './ChatBox.css'
import { UserContext } from '../../contexts/UserContext';
import { SocketContext } from '../../contexts/SocketContext';
import { Link, useParams } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import PhoneIcon from '@mui/icons-material/Phone';
import EmojiPicker from 'emoji-picker-react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Preloader from '../../components/Preloader/Preloader';
import Alerts from '../../components/Alerts/Alerts';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
const ChatBox = ({ currentUser}) => {
  const navigate = useNavigate();
  const { onlineUsers:AllOnlineUsers,messageArrived
    
  } = useContext(SocketContext)
  const {userData:user,signalProtocolManagerUser} = useContext(UserContext)

  // console.log(signalProtocolManagerUser)
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([])
  const PF = process.env.REACT_APP_NODE_ENV==='development' ? process.env.REACT_APP_DEV_PUBLIC_FOLDER:process.env.REACT_APP_PROD_PUBLIC_FOLDER;
  const {user:authUser} = useSelector((state)=> state.auth)
  const[loading,setLoading] = useState(true)
  const [onlineUsers, setOnlineUsers] = useState([])
 
  const scrollRef = useRef(); 
  const [newMessage, setNewMessage] = useState("");
  const [messageToBeSent, setMessageToBeSent] = useState("");
  const [sendingMessage,setSendingMessage] = useState(false)
   const[isTyping,setisTyping] = useState(false);
   const [keyBundles,setKeyBundles] = useState();
  const {socket} = useContext(UserContext)
  const [arrivalMessage, setArrivalMessage] = useState(null);
  let { convid } = useParams();
// console.log(convid)
const [chat, setChats] = useState();
const [online,setOnline] = useState();
const [messageRead,setMessageRead] =useState(true)


//  useEffect(()=>{
//   let decrytedMessage ;
//       const decrypt = async()=>{
//         decrytedMessage = await signalProtocolManagerUser.decryptMessageAsync("6300aaa032c6999b29555ff9", {
//           "type": 3,
//           "body": "3(_\bá\u00170á\u0017\u0012!\u0005ýó\rõßxÂE¥ÚÞ¬¯j'ãU\u0000¸t²­X\u000bÎJ7u\u001a!\u0005!*\u0005f+\u0011¬þíÆýÊÇ´=MÂ2á¸\u0018\u0015È\u0013µÈª5b\u0003\"B3\n!\u0005(ÚÂ¯áÕF{×\b¾\u0017¢·MDîÿD7rdDM\u0010\u0006\u0018\u0000\"\u0010ä#Nw<[ÇÀ\f\u001axbÇ\"³éw\u0002·<K",
//           "registrationId": 3040
//         });
        
//       }
//       decrypt()
//       console.log("Decrypted message/....//",decrytedMessage)
//  },[])
useEffect(()=>{
    const getConversations = async ()=>{
        const config ={
            headers:{
                Authorization: `Bearer ${authUser.token}`
            }
        }
        try{
            // console.log("fetching Messages")
            const conRes = await axios.get("/api/conversations/get-conversation/" + convid,config);
            const mesRes = await axios.get("/api/messages/get-messages/"+ conRes.data?._id ,config);
            //  console.log(conRes.data)
            //  message.log(mesRes.data)
             if(mesRes.data){
              await axios.put(`/api/messages/make-messages-read/${convid}`,{
                reader:authUser._id
              },config);
            }
            setChats(conRes.data)
            setMessages(mesRes.data.sort((p1,p2)=>{
              return new Date(p1.createdAt)-new Date(p2.createdAt);
            }))
            const receiverId = conRes.members.find(member=> member !==authUser._id)

            socket.emit("messageReceived",{
              conversationId: conRes._id,
              senderId: authUser._id,
              receiverId:receiverId,
              text: "",
              senderName: authUser.username,
              createdAt: Date.now()
          })
           setLoading(false)
        }catch(err){
          setLoading(false)
          console.log(err)
        }
    }
    getConversations();

},[convid ])

useEffect(()=>{
  const receiverId = chat?.members?.find(member=> member !==authUser._id)

  const getkeyBundle = async () => {

    try {

        const res = await axios.get(`/api/keybundle/getkey/${receiverId}`, {userId:receiverId});
        console.log("keybundle...", res.data)
        res.data.map((data) => (
          localStorage.setItem(receiverId, JSON.stringify(data.keyBundle))
        
        )
    )
    } catch (err) {
        console.log(err)
    }
}
getkeyBundle()
},[chat])
// console.log("remotUserkey....",keyBundles)
useEffect(()=>{
  const chatMember = chat?.members?.find((member)=>member !== user?._id)
  const online = AllOnlineUsers.find((user)=>user.userId === chatMember)
  setOnline(online? true : false)
},[chat,AllOnlineUsers,socket])
const checkOnlineStatus = (chat)=>{
  const chatMember = chat?.members?.find((member)=>member !== user?._id)
  const online = AllOnlineUsers.find((user)=>user.userId === chatMember)
    return online? true : false
}
  useEffect(()=>{
    //ws://localhost:8900
    // socket.current = io("https://hahu-chat-app-socket.herokuapp.com/")
    // const receiverId = chat.members.find(member=> member !==authUser._id)
    
    socket.on("getMessage", data =>{ // executes whene the a new message arrives
     setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        encryptedMessage: data.encryptedMessage,
        createdAt: Date.now()
     })
     setisTyping(false)
    })   

    socket.on("yourFriendIsTyping", data =>{ // executes whene the a new message arrives
        // console.log(data.text)
      if(data?.text?.length>0){
      setisTyping(true)
     }else{
      setisTyping(false)
     }
 
     })  
},[])
const setLastMessageRead=()=>{

}

useEffect(()=>{
  // console.log(newMessage)
  setMessageToBeSent(newMessage);
},[newMessage])

useEffect(()=>{ 
console.log("Mess received",messageArrived)
setMessages(existingItems => {
  return existingItems.map((item, j) => {
    return j === messages.length-1 ? item={
      sender: messageArrived.receiverId,
      text: messageArrived.text,
      status:"read",
      createdAt: messageArrived.createdAt
   }:item
  })
})
setisTyping(false)
},[messageArrived])
useEffect(()=>{
  setOnlineUsers(user?.followings.filter((f)=> AllOnlineUsers.some((u) => u.userId == f)))
  // console.log(AllOnlineUsers)

  // socket.on("getUsers", users=>{
  // })
},[AllOnlineUsers,user?.followings])
useEffect(()=>{
  arrivalMessage &&
  chat?.members.includes(arrivalMessage.sender)&&
  setMessages((prev)=> [...prev, arrivalMessage]);

},[arrivalMessage])

  const handleChange = (newMessage)=>{
    setNewMessage(newMessage)
  }

//   async getNewMsgObj(newMsgObj) {
//     let selectedUserChatId = this.getSelectedUserChatId()
//     let msgToSend = { chatId: selectedUserChatId, senderid: this.props.loggedInUserObj._id, receiverid: this.state.messageToUser._id, ...newMsgObj }
//     // Send Message for Encryption to Signal Server, then send the Encrypted Message to Push server
//     try {
//         let encryptedMessage = await this.props.signalProtocolManagerUser.encryptMessageAsync(this.state.messageToUser._id, newMsgObj.message);
//         msgToSend.message = encryptedMessage
//         this.state.ws.send(JSON.stringify(msgToSend))
//         this.setState({ lastSentMessage: newMsgObj.message }) // Storing last-sent message for Verification with Received Message
//     } catch (error) {
//         console.log(error);
//     }
// }
const handleMessageSubmit = async (e) =>{
  setSendingMessage(true)
  const config ={
      headers:{
          Authorization: `Bearer ${authUser.token}`
      }
  }
  const receiverId = chat?.members?.find(member=> member !==authUser._id)

  const message = {
      sender: authUser._id,
      senderName: authUser.username,
      text: newMessage,
      receiver:receiverId,
      conversationId: chat._id,
  };
  // message.text = encryptedMessage.body
  // console.log("Encrypted message.....??",encryptedMessage)

  try{
      const res = await axios.post("/api/messages/create", message,config);
      setMessages([...messages, res.data])
      setNewMessage("")
      const receiverId = chat.members.find(member=> member !==authUser._id)
      socket.emit("sendMessage",{
          conversationId:chat._id,
          senderId: authUser._id,
          receiverId,
          text: newMessage,
          senderName: authUser.username,
      })
   
      setSendingMessage(false)
  }catch(err){
    setSendingMessage(false)

      console.log(err)
  }
}

function handleMessageTextChange(event) {
  // console.log(event.target.value);
  setNewMessage(event.target.value)
  const receiverId = chat.members.find(member=> member !==authUser._id)

  socket.emit("isTyping",{
    conversationId:chat._id,
    senderId: authUser._id,
    receiverId,
    text: event.target.value,
    senderName: authUser.username
})
} 
  useEffect(()=>{
    const userId = chat?.members?.find((id)=>id!==currentUser)
    
    // console.log(userId)
         const getUser = async ()=>{
          try{
            const res = await axios("/api/users/getuser/?userId="+ userId);

            //  console.log(res.data)
            setUserData(res.data)
          }catch(err){
            console.log(err)
          }
        }
        if(chat !=null) getUser();
  },[chat, currentUser,online])


useEffect(()=>{
  scrollRef.current?.scrollIntoView({behavior: "smooth"});
},[messages,newMessage]);

const [chosenEmoji, setChosenEmoji] = useState(null);

const onEmojiClick = (event, emojiObject) => {
  setChosenEmoji(emojiObject);
};
  return (
    <>
      <div className='ChatBox-container'>
      
      {
        loading ?
        <Preloader/>:
       
     <>
     {
      messages ?
      <>
        
      <div className='chat-header'>
      <div className='ChatBoxfollower messageHeader'>
      {
    <Box sx={{display:{xs:"block",md:"none"},marginRight:"10px"}}> <ArrowBackIcon  onClick={() => navigate(-1)} size="large" sx={{display:{xs:"block",md:"none"},marginRight:"10px"}} /></Box>
  }
    <div>
      {
       online?      <div className='online-dot'></div>
:""
      }
       <img src={userData?.profilePicture ? userData?.profilePicture:  PF + "person/noAvatar.png"} alt="" className="followerImage" 
       style={{width:"50px" , height:"50px"}}
       />
          <div className='name' style={{fontSize: "0.8rem", display:"grid"}}>
             <span>{userData?.username}</span>
             <span>{
             online? "Online":<>
             {
              userData?.onlineAt ? <>Last seen {format(userData?.onlineAt)}</>:"Offline"
             }
            </>}</span>
          </div>
    </div>
    {/* <hr style={{width: '85%',border: '0.1px, solid #ececec'}}/> */}

  </div>

      </div>
<div className='chat-body'>
  {
    messages.length !=0?
<>
{
messages.map((message)=>(
<>
  <div className={message.sender === currentUser? "message2 own2 " : "message2"} ref={scrollRef}>

    <span>{message.text}</span>
    <span>{format(message.createdAt)}</span>
{
   message.sender ===authUser._id ?
   <>
   {
message.status =="unread" ?
<DoneIcon/> : <div>

<DoneAllIcon/>
</div>
   }
   </>:""
}

   
  </div>
</>
))
}
</>
    :
    <Alerts alert={`No new Messages yet say Hello to ${userData?.username} !!`} alertType="info"/>

  }

</div>
<div className="chat-sender">

   {/* <div>+</div> */}
   <div className="chatBoxBottom">    

   {/* <EmojiPicker onEmojiClick={onEmojiClick} /> */}
   {/* onChange={(e) =>{ setNewMessage(e.target.value)} }  */}
<textarea className='chatMessageInput'  placeholder={isTyping?`....${userData?.username} is typing...`:'Write Something..'} onChange={handleMessageTextChange } value = {newMessage}    
onKeyPress={
event => {
 if (event.key === 'Enter') {
     handleMessageSubmit(event)
 }
}
}></textarea>
<button className='chatSubmitionButton' onClick={handleMessageSubmit}><SendIcon color="primary"/></button>
</div>
   {/* <div className='send-button button' onClick={handleMessageSubmit}>Send</div> */}
</div>

      </>:"No messages"
     }
     </>
      }
     
      </div>
    </>
  )
}

export default ChatBox
