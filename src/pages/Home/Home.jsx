import React, { useContext } from 'react'
import Feed from '../../components/Feeds/Feed'
import Rightbar from '../../components/Rightbar/Rightbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Toolbar from '../../components/Navbar/Navbar'
import './home.css'
import {useSelector, useDispatch} from 'react-redux'
import { UserContext } from '../../contexts/UserContext'
import { Box } from '@mui/material'
function Home() {
    const {user} = useSelector((state)=> state.auth)
    const {windowSize} = useContext(UserContext)

    return (

        <div className="homeContainer" style={{  height: "100%"}}>
        <Sidebar/>
        <Feed />
        <Box sx={{ display: { xs:"none",sm: "none", md: "block" } ,flex:"2"}}>
        <Rightbar/>

        </Box>
        
        </div>
       

  )
}

export default Home