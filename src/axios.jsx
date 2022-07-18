import axios from "axios";

export default axios.create({
    baseURL: "https://hahu-chatapp.herokuapp.com/api",
    //baseURL: 'http://localhost:5500/api',
    timeout: 30000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
});