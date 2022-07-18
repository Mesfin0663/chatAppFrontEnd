import React, { useContext,useEffect, useState ,useRef} from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from '../../axios';
import { io } from "socket.io-client";
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
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Conversations from './Conversations/Conversations';
import M2Chat from './M2Chat/M2chat';
import NextComp from './NextComp/NextComp';
 export default function Messenger3() {
    const [count,setCount] = useState(0) 
    //const [conversations, user, socketData] = useOutletContext();

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
    const {user} = useContext(AuthContext);
    const [onlineUsers, setOnlineUsers] = useState([])
    const scrollRef = useRef(); // used to scroll to the most recent message by default
    //Fetching all conversation of a user 

   const [arrivalMessage, setArrivalMessage] = useState(null);
   
   const [socketData, setSocketData] = useState(null);


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
    let navigate = useNavigate();
console.log(location.pathname);
 
const socket = useRef(); // used to scroll to the most recent message by default
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
 
    
       
  

  return (
    <div >
         <Routes>
        <Route path="next" element={NextComp}/>
    </Routes>  
    <div className='navbar'>
            <MenuIcon fontSize="large" onClick={showSidebar} className="Hamburger-menu"/>
            <div>{title}</div>
        <div className="currentUser">
<img src="/public/assets/default Profile.png" alt="" className="conversationImg" />
  <span className="">{user.username}</span>
</div>
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


{/* {
    conversID? 
    <M2Chat conversID={conversID}  setConversID={setConversID}/> :
""
} */}

{

/* <Outlet  context={[conversations,user,socket]} /> */}
    <>

    <Routes>
        <Route path="next" element={<NextComp/>}/>
        <Route path="conv" element={
     conversID? "":<Conversations conversations={conversations} user={user}  setConversID={setConversID}/>
}>
  <Route path="chat" element={
 conversID? 
 <M2Chat conversID={conversID}  setConversID={setConversID}/> :
""}/>
</Route>
    </Routes>
    </>
    
</div>
  )
}

