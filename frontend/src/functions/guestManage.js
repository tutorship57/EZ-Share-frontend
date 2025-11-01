import axios from 'axios'

export const createGuest = async(payload,accessToken)=>{
    return await axios.post(import.meta.env.VITE_API_BASE_URL+'/api/guest/create-guest',payload,{
        headers:{Authorization:`Bearer ${accessToken}`}
    })
}

export const getAllGuest = async(accessToken)=>{
    return await axios.get(import.meta.env.VITE_API_BASE_URL+'/api/guest/getAll-guest',{
        headers:{Authorization:`Bearer ${accessToken}`}
    })
}