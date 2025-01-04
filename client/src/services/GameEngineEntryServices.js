import axios from "axios";

const GameEngineEntry_INSTANCE = axios.create({
    baseURL: 'http://localhost:9999/api/gameEngineEntries'
})

GameEngineEntry_INSTANCE.interceptors.request.use(
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
export const createGameEngineEntry = async(data) => {
    try{
        const RESponse = await GameEngineEntry_INSTANCE.post('/', data)
        return RESponse.data
    } catch(error){throw error.response.data.validationErrors}
}

//READ
export const getAllGameEngineEntries = async() => {
    try{
        const RESponse = await GameEngineEntry_INSTANCE.get('/')
        return RESponse.data
    } catch(error){throw error.response.data.validationErrors}
}

export const getOneGameEngineEntryById = async(id) => {
    try{
        const RESponse = await GameEngineEntry_INSTANCE.get(`/${id}`)
        return RESponse.data
    } catch(error){throw error.response.data.validationErrors}
}

//UPDATE
export const updateOneGameEngineEntryById = async(data) => {
    try {
        const RESponse = await GameEngineEntry_INSTANCE.put(`/${data._id}`, data)
        return RESponse.data
    } catch(error){throw error.response.data.validationErrors}
}

//DELETE
export const deleteOneGameEngineEntryById = async(id) => {
    try {
        const RESponse = await GameEngineEntry_INSTANCE.delete(`/${id}`)
        return RESponse.data
    } catch(error){throw error.response.data.validationErrors}
}
