import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://sskworldclub.demovoting.com/api',
  fileURL: 'https://sskworldclub.demovoting.com/uploads',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

export default axiosInstance;