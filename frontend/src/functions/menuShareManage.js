import axios from 'axios'



export const createMenuShare = async ( payload, accessToken) => {
    return await axios.post(import.meta.env.VITE_API_BASE_URL+`/api/menuShare/createMenuShare`, payload, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
}


export const getParticipantsMenuShare = async ( accessToken, mealId) => {
    return await axios.get(import.meta.env.VITE_API_BASE_URL+`/api/menuShare/getParticipantsMenuShare/${mealId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
}

export const getAllMenuShareInfo = async (mealId, accessToken) => {
    return await axios.get(import.meta.env.VITE_API_BASE_URL+`/api/menuShare/${mealId}/getMenuShareInfo`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
}