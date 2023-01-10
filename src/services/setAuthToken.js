import axios from "axios";

export const setAuthToken = JWT => {
    if(JWT) axios.defaults.headers.common['Authorization'] = `Bearer ${JWT}`
    else delete axios.defaults.headers.common['Authorization']
}