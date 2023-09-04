import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../axios";
import PhoneIcon from '@mui/icons-material/Phone';
import { Link } from "react-router-dom";
import ChatIcon from '@mui/icons-material/Chat';

function Followings({following}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);  
  const {user:authUser} = useSelector((state)=> state.auth)
  const PF = process.env.REACT_APP_NODE_ENV==='development' ? process.env.REACT_APP_DEV_PUBLIC_FOLDER:process.env.REACT_APP_PROD_PUBLIC_FOLDER;
  const [senderProfile, setSenderProfile ] = useState("");
  const [senderName, setSenderName] = useState("");

  useEffect(()=>{
    const getSenderData = async () =>{
        try{
           const res = await axios.get("/api/users/getuser/?userId="+ following);
           setSenderProfile(res.data.profilePicture);
           setSenderName(res.data.username)
        }catch(err){
            console.log(err)
        }
    }
    getSenderData()
},[following]);


  return (
    <div className="chatOnline" style={{marginLeft:"20px"}}>
    
     
          <div className="chatOnlineFriend">
          <div className="chatOnlineImgContainer">
          <img src={senderProfile? senderProfile: PF + "person/noAvatar.png"} alt="" className="chatOnlineImg" />
          {/* <div className="chatOnlineBadge"></div> */}

          </div>
          <div className="chatOnlineName" style={{display:"flex",gap:"1rem"}}>
          <Typography gutterBottom variant="h5" component="div">
          <Link to={`/profile/${senderName}`}>
          <span style={{color:"#0d6efd"}}>{senderName} </span>  
            </Link>
          </Typography>
         
            </div>

      </div> 
      
    </div>
  )
}

export default Followings