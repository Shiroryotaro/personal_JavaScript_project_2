import axios from 'axios'

const AUTH_INSTANCE = axios.create({
    baseURL: 'http://localhost:9999/api/auth',
    withCredentials: true // Ensure cookies are included in requests
})

//REGISTER
export const register = async(data) => {
    try {
        const RESponse = await AUTH_INSTANCE.post('/register', data)
        localStorage.setItem("token", RESponse.data.token)
        return RESponse.data
    } catch(error){throw error.response.data.validationErrors}
}

//LOGIN
export const login = async(data) => {
    try {
        const RESponse = await AUTH_INSTANCE.post('/login', data)
        localStorage.setItem("token", RESponse.data.token)
        return RESponse.data
    } catch(error){throw error.response.data.validationErrors}
}

//LOGOUT
export const logout = async() => {
    try{
        const RESponse = await AUTH_INSTANCE.post('/logout')
        return RESponse.data
    } catch(error){throw error.response.data.validationErrors}
}