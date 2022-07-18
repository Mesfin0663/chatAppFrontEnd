import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { AuthContext } from "../../context/AuthContext";
import { Remove } from "@mui/icons-material";

export default function Rightbar({ user }) {
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
   const [friends,setFriends]= useState()
   const [loading,setLoading]= useState(true)
   const {user:currentUser} = useContext(AuthContext);
   const [currentUserData, setCurrentUserData] = useState()
   const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));
   useEffect(()=>{
    const getCurrentUserData = async () =>{

    try{
      const res = await axios.get("/users/"+ currentUser._id);
      console.log(res.data)
      setCurrentUserData(res.data)
      setFollowed(res.data.followings.includes(user?._id))
      setLoading(false)
    }catch(err){

    }
  }
  getCurrentUserData()
   },[])
   useEffect(()=>{
    setFollowed(currentUserData?.followings.includes(user?._id));
   },[currentUserData, user?._id]);
   useEffect(()=>{
    const getFriends = async ()=>{
      try{
         const friendList = await axios.get("/users/friends/"+ user._id)
         console.log(friendList.data)
         setFriends(friendList.data)
        }catch(err){
        console.log(err)
      }
    }
    getFriends();
  },[user?._id])

  const handleFollowClick = async() =>{
     try{
           if(followed){
            await axios.put("/users/" + user._id + "/unfollow",{
              userId: currentUser._id,
            })
            
            //window.location.reload()
           }else{
             await axios.put("/users/" + user._id + "/follow",{
              userId: currentUser._id,
             })
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
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  
    return (
      <>
      {
        loading?<div><h1>Loading...</h1></div>:
        <div>
             {user.username !== currentUser.username &&(
        <button className="rightbarFollowButton" onClick={handleFollowClick}>
          {followed ? "Unfollow": "Follow"}
          {followed ? <Remove/>: <AddIcon/>}
        </button>
      )}
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
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
       
        <div className="rightbarFollowings">
          {friends?.map((friend) => (

        <Link to ={`/profile/${friend.username}`} style={{textDecoration:"none"}} key={friend._id}>
 <div className="rightbarFollowing">
            <img
              src={friend.profilePicture?friend.profilePicture: `${PF}person/noAvatar.png`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName" >{friend.username}</span>
          </div>
        </Link>
         
         ))}  
        </div>
        </div>
      }
   
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
