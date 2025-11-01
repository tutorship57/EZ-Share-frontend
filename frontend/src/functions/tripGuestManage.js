import axios from 'axios'

export const addTripGuests = async (payload,accessToken)=>{
    return await axios.post(import.meta.env.VITE_API_BASE_URL+'/api/tripGuest/create-tripGuests',payload,{
        headers:{Authorization:`Bearer ${accessToken}`}
    })
}

export const getAllTripGuests = async (id,accessToken)=>{
    return await axios.get(import.meta.env.VITE_API_BASE_URL+`/api/tripGuest/getAll-tripGuests/${id}`,{
        headers:{Authorization:`Bearer ${accessToken}`}
    })
}