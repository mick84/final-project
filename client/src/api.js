import axios from "axios";
const baseURL =
  (process.env.NODE_ENV === "production" ? "" : "http://127.0.0.1:5000/") +
  "api";
const API = axios.create({ baseURL });
export default API;
