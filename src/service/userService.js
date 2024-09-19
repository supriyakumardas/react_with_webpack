import axios from "axios";
import { baseurl } from "../api/baseUrl";
import { url } from "../api/apiConstants";



const userDetails =(id)=>{
    const apiUrl = baseurl+url.userDetails+id
    return axios.get(apiUrl);
}

const userByMobile =(mobile)=>{
    const apiUrl = baseurl+url.userByMobile+mobile
    return axios.get(apiUrl);
}

export default {userDetails,userByMobile};