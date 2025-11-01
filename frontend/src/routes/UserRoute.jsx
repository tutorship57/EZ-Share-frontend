import React,{ useContext, useState,useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from '../contextProvider/AuthProvider'
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";

import { fetchAccessToken ,fetchTestToken} from "../functions/accessTokenFetch";
const UserRoute = () => {
    const { accessToken,setAccessToken} = useAuth();
    const navigate = useNavigate();
    console.log(accessToken)
    useEffect(() => {
        const refreshToken = async()=>{
            if(accessToken==null){
                try {
                    const res = await fetchAccessToken()
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
        <div className="min-h-screen bg-gray-50">
            <Navbar/>

            <Outlet />
        </div>:
        <div>
            Loading...
        </div>
      )

}

export default UserRoute
