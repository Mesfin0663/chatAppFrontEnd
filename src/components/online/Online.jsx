import { Typography } from "@mui/material";
import "./online.css";

export default function Online({user}) {
  const PF = process.env.REACT_APP_NODE_ENV==='development' ? process.env.REACT_APP_DEV_PUBLIC_FOLDER:process.env.REACT_APP_PROD_PUBLIC_FOLDER;

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={PF+user.profilePicture} alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">
      <Typography gutterBottom variant="h5" component="div">
      <span style={{color:"black"}}>{user.username} </span>  

          </Typography>
     </span>
    </li>
  );
}
