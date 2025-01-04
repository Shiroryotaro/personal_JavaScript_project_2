import axios from "axios";

const USER_INSTANCE = axios.create({
    baseURL: 'http://localhost:9999/api/users'
})

USER_INSTANCE.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

//CREATE
export const createUser = async(data) => {
    try{
        const RESponse = await USER_INSTANCE.post('/', data)
        return RESponse.data
    } catch(error){throw error.response.data.validationErrors}
}

//READ
export const getAllUsers = async() => {
    try{
        const RESponse = await USER_INSTANCE.get('/')
        return RESponse.data
    } catch(error){throw error.response.data.validationErrors}
}

export const getOneUserById = async(id) => {
    try{
        const RESponse = await USER_INSTANCE.get(`/${id}`)
        return RESponse.data
    } catch(error){throw error.response.data.validationErrors}
}

//UPDATE
export const updateOneUserById = async(data) => {
    try {
        const RESponse = await USER_INSTANCE.put(`/${data._id}`, data)
        return RESponse.data
    } catch(error){throw error.response.data.validationErrors}
}

//DELETE
export const deleteOneUserById = async(id) => {
    try {
        const RESponse = await USER_INSTANCE.delete(`/${id}`)
        return RESponse.data
    } catch(error){throw error.response.data.validationErrors}
}


