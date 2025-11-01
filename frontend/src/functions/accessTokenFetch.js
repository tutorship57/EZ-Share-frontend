import axios from 'axios'


export const fetchAccessToken = async ()=>{
    return await axios.post(import.meta.env.VITE_API_BASE_URL+'/api/auth/refreshToken',{}, { withCredentials: true })
}
export const fetchTestToken = async () => {
    return await axios.get(
      import.meta.env.VITE_API_BASE_URL + '/api/auth/test-cookie',
      { withCredentials: true } // <-- config ใส่ตรงนี้เลย
    );
  }
export const usefetchToken = async()=>{
    return await fetch("http://localhost:3000/api/login", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" }
  })};
  