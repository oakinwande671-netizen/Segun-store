import axios from "axios";
import backendurl from "./backendurlsometinliketat";
const api = axios.create({
    baseURL: backendurl
});

export default api;