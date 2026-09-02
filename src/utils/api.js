import axios from "axios";
import backendurl from "./backendurlsometinliketat";
const api = axios.create({
    baseURL:'https://segun-store-backend.onrender.com/api/v1',   
     headers: {
        'Content-Type': 'application/json'
    }
});

export default api;