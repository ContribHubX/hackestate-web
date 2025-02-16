import Axios from "axios";

export const api = Axios.create({
    baseURL: "https://lvthp97m-3000.asse.devtunnels.ms",
    withCredentials: true
})