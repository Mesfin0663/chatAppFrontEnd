import axios from '../axios'


// const API = axios.create({ baseURL: 'http://localhost:5000' });

export const createChat = (data) => axios.post('/chat/', data);

export const userChats = (id) => axios.get(`/api/conversations/get-allconversations/${id}`);

export const findChat = (firstId, secondId) => axios.get(`/chat/find/${firstId}/${secondId}`);