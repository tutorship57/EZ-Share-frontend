import axios from 'axios'

export const login = async (data)=>{
    return await axios.post(import.meta.env.VITE_API_BASE_URL+'/api/auth/login',data,{withCredentials: true })
}

export const register = async (data)=>{
    return await axios.post(import.meta.env.VITE_API_BASE_URL+'/api/auth/register',data)
}


export const usefetchToken = async(data)=>{
    return await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
})};
