// Importing the requirements
import Axios from 'axios';
import storage from './localStorage'

// Specifying the Base URLS And Environemnt
const baseUrl = process.env.NODE_ENV === 'development'? 'http://localhost:5002': 'https://award.channelier.com';
const http = Axios.create({
  baseURL: baseUrl,
});

// Configuring the HTTP
http.interceptors.request.use((requestConfig) => {
  
  try {
    const token = storage.getToken()
    
    if (requestConfig && requestConfig.headers) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
    }
  }
  
  catch(err){
    console.log(err);
  }
  
  return requestConfig;
});

http.interceptors.response.use(
  
  (res) => {
    return res;
  },

  (err) => {
    console.log('Error Occured at API Calls: ', err.response);
    throw new Error(err.response.data.errorMsg);
  },

);

export default http;
