import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router';
const tripDetailRoute = () => {

    const { accessToken,setAccessToken} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const refreshToken = async()=>{
            if(accessToken==null){
                try {
                    const res = await fetchAccessToken()
                    const res2 = await fetchTestToken()
                    const newToken = res.data.accessToken;
                    if(newToken){
                        setAccessToken(newToken); 
                    }else {
                        navigate('/SignIn'); // ถ้า refresh ไม่ได้ ให้ไป login ใหม่
                    }
                } catch (error) {
                    navigate('/SignIn');
                }
            }
        }
        refreshToken()
    }, [accessToken, navigate]);
    return (accessToken?
            <Outlet />
        :
        <div>
            Loading...
        </div>
      )

}

export default tripDetailRoute
