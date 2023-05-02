import axios from "axios";

const api = axios.create({
  baseURL: "http://backend-1819812.us-east-1.elb.amazonaws.com/api",
});

export default api;

