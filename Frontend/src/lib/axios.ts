import axios from "axios";

/**
 * @brief
 * 
 *  axios.create(...) returns an Axios “client” object with methods like get, post, put, delete.
 * @param baseURL sets the server URL prefix for all requests.
 * @param withCredentials ensures cookies (like your JWT) are sent.
 * 
 * axios client = JavaScript object with methods (get, post, etc.) that we use to send http request to the backend.
 */

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api",
    withCredentials: true
})