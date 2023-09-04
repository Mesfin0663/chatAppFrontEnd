import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
//import { AuthContext } from "../../context/AuthContext";
import { Remove } from "@mui/icons-material";
import {useSelector, useDispatch} from 'react-redux'
import {UserContext} from '../../contexts/UserContext'
import { SocketContext } from "../../contexts/SocketContext";
import OnlinePeople from "./OnlinePeople";
import { Alert, Box ,Container, Typography} from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
export default function Rightbar({ user }) {

    const { onlineUsers,socket
      
    } = useContext(SocketContext)
    
  const PF = process.env.REACT_APP_NODE_ENV==='development' ? process.env.REACT_APP_DEV_PUBLIC_FOLDER:process.env.REACT_APP_PROD_PUBLIC_FOLDER;
   const [friends,setFriends]= useState()
   const [loading,setLoading]= useState(true)
   const {user:authUser} = useSelector((state)=> state.auth)
   const {userData:currentUser} = useContext(UserContext)
   const [onlineFriends, setOnlineFriends] = useState([])

   const [currentUserData, setCurrentUserData] = useState()
   const [followed, setFollowed] = useState(currentUser?.followings.includes(user?._id));

   const [conversatin,setConversation] = useState()
   const navigate = useNavigate()

   useEffect(()=>{
    const getCurrentUserData = async () =>{

    try{
      const res = await axios.get(`/api/users/getuser/?userId=${currentUser._id}`);

      setCurrentUserData(res.data)
      setFollowed(res.data.followings.includes(user?._id))
     
    }catch(err){

    }
  }
  getCurrentUserData()
   },[currentUser])

    useEffect(()=>{
           const searchConversation=async()=>{
            try{
              const res = await axios.get("/api/conversations/search-conversation/" + authUser._id)
          //  console.log(res.data)
        // console.log(res.data.filter(obj=>  obj.members.includes(user._id)))
             const conv =res.data.filter(obj=>  obj.members.includes(user._id))
        if(conv.length !=0){
          conv.map((c)=>{
            setConversation(c._id)
           })
        }
        setLoading(false)
             }catch(err){
             console.log(err)
             setLoading(false)
           }
           }  
           searchConversation()
    },[user])
   useEffect(()=>{
         

          
    // setOnlineFriends(user?.followings.filter((f)=> onlineUsers.some((u) => u.userId == f)))
setOnlineFriends(onlineUsers?.filter((u)=> currentUser?.followings.some((f)=>f ===u.userId)))
  },[onlineUsers])

   useEffect(()=>{
    setFollowed(currentUserData?.followings.includes(user?._id));
   },[currentUserData, user?._id]);
   useEffect(()=>{
    if(user){
      const getFriends = async ()=>{
        const config ={
          headers:{
              Authorization: `Bearer ${authUser.token}`
          }
      }
        try{
           const friendList = await axios.get("/api/users/friends/"+ user?._id,config)
     
           setFriends(friendList.data)
          }catch(err){
          console.log(err)
        }
      }
      getFriends();
    }
   
  },[user])

  const handleFollowClick = async() =>{
    const config ={
      headers:{
          Authorization: `Bearer ${authUser.token}`
      }
  }
     try{
           if(followed){
            await axios.put("/api/users/"  + "unfollow/" + user._id,{
              userId: currentUser._id,
            },config)
            
            //window.location.reload()
           }else{
             await axios.put("/api/users/" + "follow/" + user._id ,{
              userId: currentUser._id,
             },config)
             //window.location.reload()

           }
     }catch(err){
       console.log(err)
     }
     setFollowed(!followed)
  }
  const HomeRightbar = () => {
    return (
      <>
        {/* <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div> */}
        {/* <img className="rightbarAd" src="assets/ad.png" alt="" /> */}
        <h4 className="rightbarTitle">Online Friends</h4>
        {
          onlineFriends.length!=0 ?
   onlineFriends?.map(o =>(
    <div key={o.userId} onClick={()=>{

      // callUser(o.socketId)
      }} >
      <OnlinePeople onlineUser={o} />
    </div>
)):

<Box sx={{display:"grid" , alignItems: 'center', justifyContent:"center"}}>
     


     <Typography variant="body2" color="text.secondary">
     <Alert severity="info"> No Onlinne Friend</Alert>
   
     ሃሁ Chat👻
     </Typography>
   
   </Box>
        }
      </>
    );
  };

  const ProfileRightbar = () => {
   
    
    const PF = process.env.REACT_APP_NODE_ENV==='development' ? process.env.REACT_APP_DEV_PUBLIC_FOLDER:process.env.REACT_APP_PROD_PUBLIC_FOLDER;
   const handleSendMessage =async()=>{
 

    try{
      const config ={
        headers:{
            Authorization: `Bearer ${authUser.token}`
        }
    }

      const conv = {
        senderId: authUser._id,
        receiverId: user._id
      }
      await axios.post("/api/conversations/create",conv,config)
  //  console.log(res.data)
          navigate('/chatpage')
     }catch(err){
     console.log(err)
   }
   }
   console.log(conversatin)
    return (
      <>
      {
        loading?<div><h1>Loading...</h1></div>:
        <Container>
             {user.username !== currentUser?.username &&(
              <div>
        <button className="rightbarFollowButton" onClick={handleFollowClick}>
          {followed ? "Unfollow": "Follow"}
          {followed ? <Remove/>: <AddIcon/>}
        </button>
        {
          conversatin? <Box>
             <Link to="/chatpage"> 
            <ChatIcon className="sidebarIcon"/>
               </Link>
               <Link to="/videochat"> 
               <PhoneIcon/>           
            </Link> 
          </Box>:   <button className="rightbarFollowButton" onClick={handleSendMessage}>
          Create Conversation
       </button>
        }
     
        </div>
      )}
      <Box>
      <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship===1? "Single":user.relationship===2?"Marrid":"-"}</span>
          </div >
        </div>
      </Box>
      
        <h4 className="rightbarTitle">User friends</h4>
       
        <Box className="rightbarFollowings">
          {friends?.map((friend) => (

        <Link to ={`/profile/${friend.username}`} style={{textDecoration:"none"}} key={friend._id}>
 <Box className="rightbarFollowing">
            <img
              src={friend.profilePicture?friend.profilePicture: `${PF}person/noAvatar.png`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName" >{friend.username}</span>
          </Box>
        </Link>
         
         ))}  
        </Box>
        </Container>
      }
   
      </>
    );
  };
  return (
    <Box className="rightbar">
      <Box className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </Box>
    </Box>
  );
}
