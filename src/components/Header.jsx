import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
import './header.css'
import {FaUser} from 'react-icons/fa'
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../redux/authSlice'
function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth )
  const onLogout =()=>{
    console.log("logout")
    dispatch(logout())
    dispatch(reset())
 
  }
    return (
   <header className="header">
    <div className="logo">
        <Link to ='/'>GoalSetter</Link>
    </div>
    <ul className='navs'>
        {
            user?
            <>
        
              
                <li className='navitems'>
                <Link to ='/'>home</Link>
        
                </li >
                <li className='navitems'>
                <Link to ='/counter'>counter</Link>
        
                </li >
                <li className='navitems'>
                <Link to ='/inputfile'>InputFile</Link>
        
                </li >

                <li className='navitems'>
               <button className='btn' onClick={onLogout}>
               <FaSignInAlt/> Logout
                </button>
        
                </li >
                </> 
            :
<> 
<li className='navitems'>
                <Link to ='/login'><FaSignInAlt/> Login</Link>
        
                </li >
                <li className='navitems'>
                <Link to ='/register'><FaUser/> Register</Link>
        
                </li>
</>
                
            
        }
       
    </ul>
   </header>
  )
}

export default Header