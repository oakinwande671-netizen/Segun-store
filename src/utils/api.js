import axios from "axios";
import backendurl from "./backendurlsometinliketat";
const api = axios.create({
    baseURL: backendurl,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;