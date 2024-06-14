import axios from 'axios';
console.log("yes2")
const api = axios.create({
    baseURL: "https://localhost:44303/api/",
    headers: {
        "Content-Type": "application/json"
    }
})
export default api;