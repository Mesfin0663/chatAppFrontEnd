import "./profile.css";
import Toolbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feeds/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { useParams } from "react-router";
import { Box, CircularProgress ,Alert} from "@mui/material";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
export default function Profile() {
  const PF = process.env.REACT_APP_NODE_ENV==='development' ? process.env.REACT_APP_DEV_PUBLIC_FOLDER:process.env.REACT_APP_PROD_PUBLIC_FOLDER;
  const [user,setUser] = useState()
  const [loading,setLoading]=useState(true)
  const username = useParams().username
  useEffect(() => {
   setUser()
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/getuser?username=${username}`);
        setUser(res.data)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.log(err)
      }

    }
    fetchUser();

  }, [username])
 
  return (
    <>
    {
      loading?  <Box sx={{ display: 'flex', justifyContent:"center",  alignItems:"center",minHeight: '100vh' }}>
      <CircularProgress />
    </Box>:
    <>
    {
      user?
      <div className="profile">
      <Sidebar />
      <div className="profileRight">
        <div className="profileRightTop">
          <div className="profileCover">
            <img
              className="profileCoverImg"
              src={user.coverPicture || PF + "person/noCover.png"}
              alt=""
            />
            <img
              className="profileUserImg"
              src={user.profilePicture || PF + "person/noAvatar.png"}
              alt=""
            />
          </div>
          <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
          </div>
        </div>
        <div className="profileRightBottom">

         
        
                     <Rightbar user={user}/>
        </div>
        {/* <Box>
         
                  <Feed username={user.username}/>
                    </Box>   */}

      </div>
      
    </div>:
   <Box sx={{height:'100vh',display:"flex" , alignItems: 'center', justifyContent:"center"}}>
     

   <Card sx={{ maxWidth: 345 }}>

   <CardContent>
     <Typography gutterBottom variant="h5" component="div">
       HaHu Chat👻
     </Typography>
     <Typography variant="body2" color="text.secondary">
     <Alert severity="error">{username} Not found</Alert>

    
     </Typography>
   </CardContent>
   <CardActions>
     <Link to="/">
     <Button size="small">Go Back</Button>
   
     </Link>
   </CardActions>
 </Card>
   </Box>
    }
    </>
    }
    
    </>
  );
}
