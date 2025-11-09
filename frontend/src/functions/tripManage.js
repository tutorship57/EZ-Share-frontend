import axios from 'axios'

export const createTrip = async(payload,accessToken)=>{
    return await axios.post(import.meta.env.VITE_API_BASE_URL+'/api/trip/create-trip',payload,{
        headers:{ Authorization:`Bearer ${accessToken}`}
    })
}
export const getAllTrips = async(accessToken)=>{
    return await axios.get(import.meta.env.VITE_API_BASE_URL+'/api/trip/getTrip',{
        headers:{ Authorization:`Bearer ${accessToken}`}
    })
}

export const deleteTripById = async(tripId,accessToken)=>{
    return await axios.delete(import.meta.env.VITE_API_BASE_URL+`/api/trip/delete-trip/${tripId}`,{
        headers:{ Authorization:`Bearer ${accessToken}`}
    })
}