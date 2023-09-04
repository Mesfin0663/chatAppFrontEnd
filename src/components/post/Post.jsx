import "./post.css";
import { MoreVert } from '@mui/icons-material';
import { Users } from "../../dummyData";
import { useContext, useEffect, useState } from "react";
import axios from '../../axios';
import {format} from "timeago.js";
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'

import { Favorite, FavoriteBorder, Share } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
export default function Post({ post }) {
  const PF = process.env.REACT_APP_NODE_ENV==='development' ? process.env.REACT_APP_DEV_PUBLIC_FOLDER:process.env.REACT_APP_PROD_PUBLIC_FOLDER;

  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user,setUser] = useState({})
  const {user:currentUser} = useSelector((state)=> state.auth)
  const likeHandler =()=>{

    try{
      const config ={
        headers:{
            Authorization: `Bearer ${currentUser.token}`
        }
    }
      axios.put(`/api/posts/like/${post._id}`,{userId:currentUser._id},config)
    }catch(err){
      console.log(err)
    }
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  useEffect(() => {

    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/getuser?userId=${post.userId}`);
 
        setUser(res.data)
      } catch (err) {
        console.log(err)
      }

    }
    fetchUser();

  }, [post.userId])

  return (
    <Card className="post">
    <div className="postWrapper">
      <div className="postTop">
        <div className="postTopLeft">
        <Link to={`/profile/${user.username}`}> 
          <img
            className="postProfileImg"
            src={user.profilePicture || PF+ "person/noAvatar.png"}
            alt=""
          />
        </Link>
        <Link to={`/profile/${user.username}`}> 
          <span className="postUsername">
            {user.username}
          </span>
        </Link>
          <span className="postDate">{format(post.createdAt)}</span>
        </div>
        <div className="postTopRight">
          <MoreVert />
        </div>
      </div>
      <div className="postCenter">
      <div dangerouslySetInnerHTML={ { __html: post?.desc } } ></div>

        {/* <html className="postText textf">{post?.desc}</html> */}
        <img className="postImg" src={post.img } alt="" />
      </div>
      <div className="postBottom">
        <div className="postBottomLeft">
          <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
          <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
          <span className="postLikeCounter">{like} people like it</span>
        </div>
        <div className="postBottomRight">
          <span className="postCommentText">{post.comment} comments</span>
        </div>
      </div>
    </div>
  </Card>
  );
}
