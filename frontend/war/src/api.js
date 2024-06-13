import axios from 'axios';
console.log("yes2")
const api = axios.create({
    baseURL: "https://war-24zn.onrender.com/",
    headers: {
        "Content-Type": "application/json"
    }
})
export default api;
