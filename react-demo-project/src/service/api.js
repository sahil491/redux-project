import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/v1",
  withCredentials: false,
  crossDomain: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
// eslint-disable-next-line dot-notation
// axios.defaults.headers.common["Authorization"] = "AUTH_TOKEN";

// export const URL = "http://localhost:5000/v1";
export default api;
