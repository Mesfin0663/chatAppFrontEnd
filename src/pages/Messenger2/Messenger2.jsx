import React, { useContext,useEffect, useState ,useRef} from 'react'
import {UserContext} from '../../contexts/UserContext'
import {useSelector, useDispatch} from 'react-redux'

import axios from '../../axios';
import { io } from "socket.io-client";
import { styled, alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

import {
    BrowserRouter as Router ,

    useNavigate,
    Routes,
    Route,
    Link,
    useLocation
    // Redirect
  } from "react-router-dom";
  import { Outlet } from 'react-router-dom';
import './messenger2.css'
import CloseIcon from '@mui/icons-material/Close';
import Conversations from './Conversations/Conversations';
import M2Chat from './M2Chat/M2chat';
import NextComp from './NextComp/NextComp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AccessAlarm, ThreeDRotation, Person, Search, Chat, Notifications } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
 export default function Messenger2() {
    const [count,setCount] = useState(0) 
    //const [conversations, user, socketData] = useOutletContext();
    const PF = import.meta.env.VITE_NODE_ENV==="development"? import.meta.env.VITE_REACT_APP_DEV_PUBLIC_FOLDER:import.meta.env.VITE_REACT_APP_PROD_PUBLIC_FOLDER;

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [title,setTitle]= useState("")
    const [screen,setScreen]= useState("")

    const location = useLocation();

    
  const [conversID,setConversID]= useState()
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState({});
    const [newMessage, setNewMessage] = useState("");
    const {user:authUser} = useSelector((state)=> state.auth)
    const {userData:user} = useContext(UserContext)
    const {socket} = useContext(UserContext)
    // const {user} = useContext(AuthContext);
    const [onlineUsers, setOnlineUsers] = useState([])
    const scrollRef = useRef(); // used to scroll to the most recent message by default
    //Fetching all conversation of a user 

   const [arrivalMessage, setArrivalMessage] = useState(null);
   
   const [socketData, setSocketData] = useState(null);

   const [scrollPosition, setScrollPosition] = useState(0);
   const handleScroll = () => {
     const position = window.pageYOffset;
     setScrollPosition(position);
   };
 
   useEffect(() => {
     window.addEventListener("scroll", handleScroll);
 
     return () => {
       window.removeEventListener("scroll", handleScroll);
     };
   }, []);
// useEffect(()=>{
//    console.log(scrollPosition)
// },[scrollPosition])
    useEffect(()=>{
        if(location.pathname=="/messenger2"){
            setConversID(null)
        }
       if(location.pathname=="/chatui/online-friends"){
        setTitle("Onlien")
       }else if(location.pathname == "/chatui"){
        setTitle("Conversations")
       }else {
        setTitle("Chat")
       }

    },[location])
    //let { path, url } = useRouteMatch();
//     let navigate = useNavigate();
// console.log(location.pathname);
 
// const socket = useRef(); // used to scroll to the most recent message by default
//Fetching all conversation of a user 
// useEffect(()=>{
//   if(user){
//     socket.current = io("ws://localhost:8900");

//     socket.current.emit("addUser", user._id);
//     socket.current.on("getUsers", users=>{
//         setOnlineUsers(user.followings.filter((f)=> users.some((u) => u.userId == f)))
//          console.log("from socket io",users)
//       })
//   }
 
// },[user])  
const logout = () => {
    localStorage.removeItem('user');
    navigate('/signin')
    window.location.reload()
  };
    
    
        // Fetches all conversations that a single user participates in
        useEffect(()=>{
            const getConversations = async ()=>{
              const config ={
                headers:{
                    Authorization: `Bearer ${authUser.token}`
                }
            }
                try{
                    const res = await axios.get("/api/conversations/get-allconversations/" + user._id,config);
                    setConversations(res.data)
                }catch(err){
                  console.log(err)
                }
            }
            getConversations();
    
        },[user?._id])
    // this is used to fetch messages from the database accoding to the conversatin iod
 
    
       
  

  return (
    <div >
        
    <div className={scrollPosition>78?'navbar fixed': 'navbar'}>

    <ArrowBackIcon fontSize="large" onClick={()=>{
         window.location.reload()

  navigate(-1);

 }} />

   {/* <div>{title}</div> */}
        <div className="currentUser">
             <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
            
              aria-haspopup="true"
             
              color="inherit"
            >
        <div className="dropdown">
       <img src={user?.profilePicture? user?.profilePicture: PF + "person/noAvatar.png"} alt="" className="conversationImg dropbtn" />

  <div className="dropdown-content">
    <Link to={""}>               <span className="">{user?.username}</span>
</Link>

    <Link to={""}>Acount</Link>
    <button className='logoutButton' onClick={logout}><PowerSettingsNewIcon/></button>
  </div>
</div>
            </IconButton>
               {/* <span className="">{user.username}</span> */}

      
</div>
<div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem"> 
              <Chat />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
 
  <MenuIcon fontSize="large" onClick={showSidebar} className="Hamburger-menu"/>

    </div>
    <div className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
            <p className="navbar-toggle">
         
                    <CloseIcon fontSize="large" onClick={showSidebar} />
            
            </p>
            <li className='nav-text'>
                <Link to="/">
                    <span>Home</span>
                </Link>
            </li>
           
            <li className='nav-text'>
                <Link to="">
                    <span>Conversations</span>
                </Link>
            </li>
            <li className='nav-text'>
                <Link to="/chatui/online-friends">
                    <span>Online</span>
                </Link>
            </li>
            <li className='nav-text'>
                <Link to="/chatui/search">
                    <span>Search</span>
                </Link>
            </li>
        </ul>
    </div>



{
  conversations?    conversID? "":<Conversations conversations={conversations} user={user}  setConversID={setConversID}/>
: <div><h1>Loading..</h1></div>
}

{

/* <Outlet  context={[conversations,user,socket]} /> */}
    <>

    <Routes>
        <Route path="next" element={<NextComp/>}/>
        <Route path="chat" element={
    conversID? <M2Chat conversID={conversID}  setConversID={setConversID}/>:""
}/>

    </Routes>
    </>
    
</div>
  )
}

