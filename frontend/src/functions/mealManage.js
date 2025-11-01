import axios from 'axios'

export const createMeal = async (tripId,payload,accessToken)=>{
    return await axios.post(import.meta.env.VITE_API_BASE_URL+`/api/meal/create-meal/${tripId}`,payload,{
        headers:{Authorization:`Bearer ${accessToken}`}
    })
}

export const getAllMeals = async (tripId,accessToken)=>{
    return await axios.get(import.meta.env.VITE_API_BASE_URL+`/api/meal/getAll-meals/${tripId}`,{
        headers:{Authorization:`Bearer ${accessToken}`}
    })
}