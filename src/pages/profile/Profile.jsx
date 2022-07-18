import "./profile.css";
import Toolbar from "../../components/Toolbar/Toolbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feeds/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { useParams } from "react-router";

export default function Profile() {
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  const [user,setUser] = useState({})
  const username = useParams().username
  useEffect(() => {

    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?username=${username}`);
        setUser(res.data)
      } catch (err) {
        console.log(err)
      }

    }
    fetchUser();

  }, [username])
  return (
    <>
      <Toolbar />
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
            <Feed username={user.username}/>

            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}
