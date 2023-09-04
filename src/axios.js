import axios from "axios";

export default axios.create({
    // baseURL: 'https://hahu-chat-backend.herokuapp.com/',
    baseURL: process.env.REACT_APP_NODE_ENV==='development' ? process.env.REACT_APP_DEV_API_URL:process.env.REACT_APP_PROD_API_URL,
    timeout: 30000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
});