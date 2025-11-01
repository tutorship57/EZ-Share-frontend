import axios from 'axios'

export const createMenu = async (mealId,payload,accessToken)=>{
    return await axios.post(import.meta.env.VITE_API_BASE_URL+`/api/menu/${mealId}/createMenu`,payload,{
        headers:{Authorization:`Bearer ${accessToken}`}
    })
}
export const getAllMenu = async(mealId,accessToken)=>{
    return await axios.get(import.meta.env.VITE_API_BASE_URL+`/api/menu/${mealId}/getAllMenu`,{
        headers:{Authorization:`Bearer ${accessToken}`}
    })
}

