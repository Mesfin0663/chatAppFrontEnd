import React, { useContext } from 'react'
import Feed from '../../components/Feeds/Feed'
import Rightbar from '../../components/Rightbar/Rightbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Toolbar from '../../components/Toolbar/Toolbar'
import { AuthContext } from '../../context/AuthContext'
import './home.css'

function Home() {
  const {user} = useContext(AuthContext)
  return (
    <>
        <Toolbar username ={user.username}/>
        <div className="homeContainer">
        <Sidebar/>
        <Feed />
        <Rightbar/>
        
        </div>
       
    </>
  )
}

export default Home