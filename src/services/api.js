import axios from "axios";

const api = axios.create({
  baseURL: "http://52.0.225.150:5001/api/",
});

export default api;

