import axios from 'axios';
const URL = process.env.REACT_APP_API_URL

const register = params => {
    return axios.post(`${URL}/auth/register`, params)
}

const verify = (accessToken) => {
    return axios.get(`${URL}/auth/verify/${accessToken}`)
}

const login = (params) => {
    return axios.post(`${URL}/auth/login`, params)
}

const logout = (accessToken) => {
    const reqConfig = {
        "headers": {
            "Authorization": `Bearer ${accessToken}`,
        }

    }
    return axios.get(`${URL}/auth/logout`, reqConfig)
}

const updatePassword = (params, accessToken) => {
    const reqConfig = {
        "headers": {
            "Authorization": `Bearer ${accessToken}`,
        }
    }
    return axios.post(`${URL}/auth/updatePassword`, params, reqConfig)
}

const forgotPassword = params => {
    return axios.post(`${URL}/auth/forgotPassword`, params)
}

export default {
    login,
    logout,
    register,
    verify,
    updatePassword,
    forgotPassword
}