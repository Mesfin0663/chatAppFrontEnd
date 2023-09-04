import { async } from '@firebase/util'
import { Box, Container } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Route, Routes ,useLocation} from 'react-router-dom'
import { userChats } from '../../api/ChatRequests'
import axios from '../../axios'
import Alerts from '../../components/Alerts/Alerts'
import Preloader from '../../components/Preloader/Preloader'
import { SocketContext } from '../../contexts/SocketContext'
import { UserContext } from '../../contexts/UserContext'
import './Chat.css'
import ChatBox from './ChatBox'
import Conversation from './Coversation/Conversation'
import LogoSearch from './LogoSearch/LogoSearch'
const ChatPage = ({signalProtocolManagerUser}) =>{
    
    const {userData:user} = useContext(UserContext)
    const {user:authUser} = useSelector((state)=> state.auth)
   const [currentChat,setCurrentChat]=useState();
    const [chats, setChats] = useState([]);
    const location = useLocation()
    const { onlineUsers:AllOnlineUsers
    
    } = useContext(SocketContext)
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        const getChats = async ()=>{
            const config ={
                headers:{
                    Authorization: `Bearer ${authUser.token}`
                }
            }
            try{
                // console.log("tetching conversaiton")
                const res = await axios.get("/api/conversations/get-allconversations/" + authUser?._id,config);
                // console.log(res.data)
                setChats(res.data)
                setLoading(false)
            }catch(err){
              console.log(err)
              setLoading(false)
            }
        }
        getChats();
    },[user])

    const checkOnlineStatus = (chat)=>{
        const chatMember = chat?.members?.find((member)=>member !== user?._id)
        const online = AllOnlineUsers.find((user)=>user.userId === chatMember)
          return online? true : false
    }
    return (
        <Container className=''>
            {
                loading ?
                <Preloader/>:
                <Box className='Chat' sx={{padding:"0", margin:"0"}}>
                {
                    location.pathname === "/chatpage"?
            
                    <Box className='Left-side-chat'>
                    <LogoSearch/>
                    <div className='Chat-container'>
                    <h2>Chats</h2>
              <div className='Chat-List'>
              {
                    chats.length !=0?
                    <div className='Chat-List'>
                    {
                     chats.map((chat)=>(
                         <NavLink to={`/chatpage/${chat._id}`}>
                 <div key={chat._id} onClick={()=> setCurrentChat(chat)} >
                             <Conversation data={chat} currentUserId={authUser._id} online={checkOnlineStatus(chat)} />
                         </div>
                         </NavLink>
                        
                     ))
                    }
                   </div>:
  <Box sx={{maxWidth:"200px"}}>
  <Alerts alert={`You don't have conversations Yet !!`} alertType="info"/>

 </Box>                   }
              </div>
                    </div>
            
            
              </Box>:   <Box sx={{display:{xs:"none",md:"block"}}} className='Left-side-chat'>
                    <LogoSearch/>
                    <div className='Chat-container'>
                    <h2>Chats</h2>
                   {
                    chats.length !=0?
                    <div className='Chat-List'>
                    {
                     chats.map((chat)=>(
                         <NavLink to={`/chatpage/${chat._id}`}>
                 <div key={chat._id} onClick={()=> setCurrentChat(chat)} >
                             <Conversation data={chat} currentUserId={authUser._id} online={checkOnlineStatus(chat)} />
                         </div>
                         </NavLink>
                        
                     ))
                    }
                   </div>:
  <Box sx={{maxWidth:"200px"}}>
  <Alerts alert={`You don't have conversations Yet !!`} alertType="info"/>

 </Box>                   }
            
                    </div>
            
            
              </Box>
                }
                          
                       
                          <div className="Right-side-chat">
                             
                    
            
                          <Routes>
                          <Route path="" element={ <Box sx={{display:{xs:"none",md:"block"}}}>    <Alerts alert={`Select a conversation !!`} alertType="info"/>
</Box>  } />
            
                          <Route path=":convid" element={     <ChatBox chat={currentChat} currentUser ={authUser._id} signalProtocolManagerUser={signalProtocolManagerUser} />} />
                    </Routes>
                           
                          </div>
                    </Box>
            }
 

      
        </Container>
      
    )
}
export default ChatPage