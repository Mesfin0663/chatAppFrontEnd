import axios from 'axios';
import React,{useContext, useEffect, useState} from 'react';
import { AuthContext } from '../../context/AuthContext';

import './feed.css';

const axio = axios.create({
  baseURL:'http://localhost:8800/api',
  timeout: 30000
})

function Feed() {
  const {user} = useContext(AuthContext)
  console.log(user)
  const [apiResponse, setApiResponse] = useState({});
const [loading, setLoading] = useState(false);
 
  return (
    <div className="feed">
    
    </div>
  )
}

export default Feed