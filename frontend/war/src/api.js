import axios from 'axios';

const api = axios.create({
    baseURL: "https://war-24zn.onrender.com/api/",
    headers: {
        "Content-Type": "application/json"
    }
})
export default api;