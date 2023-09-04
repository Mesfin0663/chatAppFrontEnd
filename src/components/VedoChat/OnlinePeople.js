import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../axios";
import PhoneIcon from '@mui/icons-material/Phone';

function OnlinePeople({onlineUser}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);  
  const {user:authUser} = useSelector((state)=> state.auth)
  const PF = process.env.REACT_APP_NODE_ENV==='development' ? process.env.REACT_APP_DEV_PUBLIC_FOLDER:process.env.REACT_APP_PROD_PUBLIC_FOLDER;
  const [senderProfile, setSenderProfile ] = useState("");
  const [senderName, setSenderName] = useState("");

  useEffect(()=>{
    const getSenderData = async () =>{
        try{
           const res = await axios.get("/api/users/getuser/?userId="+ onlineUser.userId);
           setSenderProfile(res.data.profilePicture);
           setSenderName(res.data.username)
        }catch(err){
            console.log(err)
        }
    }
    getSenderData()
},[onlineUser]);


  return (
    <div className="chatOnline">
    
     
          <div className="chatOnlineFriend">
          <div className="chatOnlineImgContainer">
          <img src={senderProfile? senderProfile: PF + "person/noAvatar.png"} alt="" className="chatOnlineImg" />
          <div className="chatOnlineBadge"></div>

          </div>
          <div className="chatOnlineName">
            
            <p style={{fontSise:"10px",color:"black",padding:0,margin:0}}> {senderName} <PhoneIcon/></p>
            {/* <p style={{fontSise:"10px",color:"red",padding:0,margin:0}}>{onlineUser.socketId}</p> */}

            </div>

      </div> 
      
    </div>
  )
}

export default OnlinePeople