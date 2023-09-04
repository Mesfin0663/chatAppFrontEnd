import { useContext, useEffect, useRef, useState } from 'react'
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import { createSignalProtocolManager, SignalServerStore } from "./signal/SignalGateway"
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment,incrementByAmount } from "./redux/counterSlice";
import {BrowserRouter as Router , Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Counter from './pages/Counter';
import Header from './components/Header';
import {ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {register, reset} from "./redux/authSlice";
import SongForm from './components/SongForm';
import EmailVerify from './pages/EmailVerify/EmailVerify';
import { io } from "socket.io-client";
import {UserContext} from '../src/contexts/UserContext'

import logo from './logo.svg';
import './App.css';
import VedioChat from './components/VedoChat/VedioChat';
import Options from './components/VedoChat/Options';
import Notifications from './components/VedoChat/Notifications';

import Home from './pages/Home/Home';
import axios from './axios';
import Profile from './pages/profile/Profile';
import Messenger from './pages/Messenger/Messenger';
// import Messenger2 from './pages/Messenger2/Messenger2';
import Navbar from './components/Navbar/Navbar';
import { SocketContext } from './contexts/SocketContext';
import VideoChatHOme from './pages/VideoChatFunc/VideoChatHome';
import MessageNot from './pages/MessageNotifications/MessageNot';
import PostNot from './pages/PostNotifications/PostNot';
import Friends from './pages/Friends/Friends';
import DesignSystem from './components/DesignSystem/DesignSystem';
import Messenger3 from './pages/Messenger/Messenger3';
import Landing from './pages/Landing/Landing';
import ConversationPage from './pages/Conversations/ConversationPage';
import ChatUi from './pages/ChatUi/ChatUi';
import ChatUI2 from './pages/ChatUi/ChatUI2';
import Chat from './pages/Chat/Chat';
import ChatPage from './pages/Chat/Chat';
import NotFound from './pages/NotFound/NotFound';
import SecureChat from './pages/SecureChat/SecureChat';
import Preloader from './components/Preloader/Preloader';
// import ConversationPage from './pages/ConversationsPage/ConversationPage';
function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}
function App() {
  const { socket  } = useContext(SocketContext)
  const {user} = useSelector((state)=> state.auth)
  const [userData,setUserData]= useState();
  const [messageNotification, setMesssageNotififcation]= useState()
  const [unreadMessageCount, setUnreadMessageCount]= useState()
  const [unreadPostCount, setUnreadPostCount]= useState()
  const [signalProtocolManagerUser,setSignalProtocolManagerUser] = useState();
  const [arrivalMessage, setArrivalMessage] = useState(null);
 const[loading,setLoading]= useState(true)

  const showNotification=()=> {
   console.log("shwo")
   console.log("clicked")
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
 
   new Notification("Hi there!","kdfjgksjg;fj;skf");
    console.log("notifying")
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        let notification = new Notification("Hi there!");
      }
    });
  }
  }
 
  useEffect(()=>{
       if(user && !signalProtocolManagerUser){
        

       }
  },[])

  useEffect(()=>{
          const getUser=async()=>{
            try{
              const res = await axios.get(`/api/users/getuser/?userId=${user._id}`);
             
               setUserData(res.data)
            }catch(err){
        
            }
          }
          getUser()
          createSignalProtocolManager(user?._id, user?.username,  new SignalServerStore())
        .then(signalProtocolManagerUser => {
          console.log(signalProtocolManagerUser)
          setSignalProtocolManagerUser(signalProtocolManagerUser);
          localStorage.setItem("signalProtocolManager", JSON.stringify(signalProtocolManagerUser))
        })
        setLoading(false)
  },[])
  useEffect(()=>{
    const getMessageNotifications=async()=>{
      try{
        const unreadMessageCount = await axios.get(`/api/notifications/get-unread-message-count/${user._id}`);
        const unreadPostCount = await axios.get(`/api/notifications/get-unread-post-count/${user._id}`);
        setUnreadPostCount(unreadPostCount.data.unreadPostCount)
        setUnreadMessageCount(unreadMessageCount.data.unreadMessageCount)
      }catch(err){
  
      }
    }
    getMessageNotifications()
},[])

  const sendPing = () => {
    socket.current.emit('ping from home',user._id);
  }
  const [windowSize, setWindowSize] = useState(getWindowSize());
useEffect(() => {
 function handleWindowResize() {
   setWindowSize(getWindowSize());
 }

 window.addEventListener('resize', handleWindowResize);

 return () => {
   window.removeEventListener('resize', handleWindowResize);
 };
}, []);

const [mode, setMode] = useState("light");

const darkTheme = createTheme({
  palette: {
    mode: mode,
  },
});


  return (
    <>
 {
    loading? <Preloader/>:
    <ThemeProvider theme={darkTheme}>

    <Box bgcolor={"background.default"} color={"text.primary"} >

<UserContext.Provider value = {{socket:socket,windowSize,setMode,mode, userData:userData ,messageNotification,unreadMessageCount,unreadPostCount,signalProtocolManagerUser}}>


     <Router>
     <Navbar username ={user?.username}/>

         <Routes>
         <Route path='/login' element={user?<Home/>:<Login/>} />
        <Route path='/register' element={user?<Home/>:<Register/>} />

        <Route path='/landing' element={user?<Landing/>:<Landing/>} />

         <Route path='/' element= {user?<Home/>:<Login/>}/>
         <Route path ="/profile/:username" element={<Profile/>}/>
         <Route path="/messenger2/*" element={
            windowSize.innerWidth>800?user?<Messenger/>:<Login/>:
            user?<Messenger3/>:<Login/>
           
          } 
            
            /> 

<Route path="/messenger3/*" element={
            // windowSize.innerWidth>800?user?<Messenger/>:<Login/>:
            // user?<Messenger2/>:<Login/>
            <Messenger3/>
          } 
            
            /> 

<Route path='/conversations/*' element= {user?<ConversationPage/>:<Login/>}/>
<Route path='/chatpage/*' element= {user?<ChatPage signalProtocolManagerUser={signalProtocolManagerUser}/>:<Login/>} />
<Route path='/secure-chat/*' element= {user?<SecureChat signalProtocolManagerUser={signalProtocolManagerUser}/>:<Login/>} />

            <Route path='/videochat' element= {user?<VideoChatHOme/>:<Login/>}/>
            <Route path='/friends' element= {user?<Friends/>:<Login/>}/>

            <Route path='/message-notifications' element= {user?<MessageNot/>:<Login/>}/>
            <Route path='/alerts' element= {user?<PostNot/>:<Login/>}/>

          <Route path='/dashboard' element= {user?<Dashboard/>:<Login/>}/>
          <Route path='/design' element={<DesignSystem/>} />
          <Route path='/chatui' element={<ChatUi/>} />
          <Route path='/chat' element={<ChatUI2/>} />

        <Route path='/counter' element={<Counter/>} />
        <Route path='/inputfile' element={<SongForm/>} />
         <Route path='/users/:id/verify/:token' element={<EmailVerify/>} />
         <Route path='*' element={<NotFound/>} />

         </Routes>
     </Router>
   <ToastContainer/>
 

   </UserContext.Provider>
    </Box>
    </ThemeProvider>
 }
  
        </>
  );
}

export default App;
