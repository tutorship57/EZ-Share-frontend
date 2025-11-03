import axios from 'axios'

export const getUserProfile = (payload,accessToken)=>{
    return axios.get(import.meta.env.VITE_API_BASE_URL+'/api/user/profile',{
        headers:{Authorization:`Bearer ${accessToken}`}
    })
}


