import axios from "axios";
import { BASE_URL } from "../constants/constants";



const Axiosinstance=axios.create({
    baseURL:BASE_URL
})


Axiosinstance.interceptors.request.use(function(config){
    const token=localStorage.getItem('token')
    config.headers['Authorization']='Bearer '+token
    config.headers['Access-Control-Allow-Origin']='*'
    return config
})

export default Axiosinstance;