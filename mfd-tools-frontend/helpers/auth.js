import axios from "axios";
import { NEXT_URL } from "../config/url";

const forgotPassword = (email) => {
    return axios.post(`${NEXT_URL}/api/auth/forgotPassword`,{
        email
    })
}

const resetPassword = (uid,password) => {
    return axios.post(`${NEXT_URL}/api/auth/resetPassword`,{
        password,uid
    })
}

const registerUser = (email,password) => {
    return axios.post(`${NEXT_URL}/api/auth/registerUser`,{
        email,password
    })
}

export default {
    forgotPassword,
    resetPassword,
    registerUser,
}           