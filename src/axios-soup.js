import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const instance = axios.create({
  baseURL: backendUrl,
});

export default instance;
