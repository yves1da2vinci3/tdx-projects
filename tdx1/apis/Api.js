import axios from 'axios';
// export const BASE_URL = "https://king-prawn-app-xh88t.ondigitalocean.app";
export const BASE_URL = "http://192.168.1.151:5000";
  
export const httpClient = axios.create({
    baseURL : "http://192.168.1.151:5000"
})
// export const httpClient = axios.create({
//     baseURL : "https://king-prawn-app-xh88t.ondigitalocean.app"
// })