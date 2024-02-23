import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "http://127.0.0.1:5001/clone-d489a/us-central1/api",
    baseURL:"https://api-rx2wv5f5ta-uc.a.run.app"
})

export {axiosInstance}