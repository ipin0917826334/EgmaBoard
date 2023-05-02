import axios from "axios";

const api = axios.create({
  baseURL: "http://44.212.2.30:5001/api/",
});

export default api;

