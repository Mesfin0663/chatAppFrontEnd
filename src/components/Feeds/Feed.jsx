import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from '../../axios';
import { io } from "socket.io-client";
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import { Box, Button,Container, Typography,Alert,CircularProgress} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
export default function Feed({username}) {
  const [posts, setPosts] = useState([]);
  const {user} = useSelector((state)=> state.auth)
    const [loading,setLoading] = useState(true)
  useEffect(() => {

    const fetchPosts = async () => {
      const config ={
        headers:{
            Authorization: `Bearer ${user.token}`
        }
    }
      try {
        const res = username? await axios.get("/api/posts/get-all-posts/"+username) 
        : await axios.get(`/api/posts/get-timeline-posts/${user._id}/1/15`,config);
        setPosts(res.data.timelinePosts.data?.sort((p1,p2)=>{
          return new Date(p2.createdAt)-new Date(p1.createdAt);
        }))
        setLoading(false)
      } catch (err) {
        console.log(err)
      }

    }
    fetchPosts();

  }, [])

  return (
    <Container className="feed">
                     
                  <Alert severity="success" sx={{margin:"15px"}}>Welcome {user.username} !!</Alert>

      <Box sx={{ display: "flex",marginTop:"15px", marginInline:"auto" ,maxWidth:"550px" ,alignItems: 'center', justifyContent:"center"}}>
<Share/>
      </Box>


      <Box className="feedWrapper" sx={{marginTop:"10px"}}>
      
      {/* { username === user.username && <div>postes related to {user.username}</div>} */}
   
   {
    loading ?<Box sx={{paddingTop:'20px',display:"flex" , alignItems: 'center', justifyContent:"center"}}>
    <CircularProgress/>
 </Box>
 
 :

    <>
     {
        posts?.length!=0?
        <>

        {

        posts.map((p) => (
          <Post key={p._id} post={p} />
        ))
}
        </>
        :
        <Box sx={{marginTop:'10px',display: "grid" , alignItems: 'center', justifyContent:"center"}}>
          

      <Card sx={{ margin:"10px"}}>
   
   <CardContent>
   <Typography gutterBottom variant="h5" component="div">
   ሃሁ Chat👻
        </Typography>
     <Typography variant="body2" color="text.secondary">
     <Alert severity="info" >Follow Some Friends To see their posts!!
     You can use the search bar to find friends with their user name, Enter user name and click the search icon !!     </Alert>
     <Alert severity="info" sx={{marginTop:"10px"}}>
      After finding your friend click create conversation and it will take you to the conversation stage, where you will be able to select among many of your conversations, Then you can chat realtime with your friend
     </Alert>

    
     </Typography>
   </CardContent>
   <CardActions>
     <Link to="/profile/user 1">
     <Button size="small">Or Contact The Developer</Button>
   
     </Link>
   </CardActions>
 </Card>
      </Box>
      }

    </>
   }

             </Box>
    </Container>
  );
}
