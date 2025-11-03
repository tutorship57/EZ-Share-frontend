import React,{ useContext, useState,useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from '../contextProvider/AuthProvider'
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import { twoStepTryFetch } from "../services/apiCallwithToken" 
import { fetchAccessToken ,fetchTestToken} from "../functions/accessTokenFetch";
import { getUserProfile } from "../functions/userManage";
const UserRoute = () => {
    const { accessToken , setAccessToken } = useAuth();
    const navigate = useNavigate();
    const [userProfile,setUserProfile] = useState(null)
    const fetchUserProfile = async () => {
        try {
            console.log("this is accessToken",accessToken)
            const resUserProfile = await twoStepTryFetch(getUserProfile,{},accessToken,setAccessToken)
            console.log("this is resUserProfile",resUserProfile.data.userProfile)
            setUserProfile(resUserProfile.data.userProfile)

           
        } catch (error) {
            console.log(error)
        }
    }
    const refreshToken = async()=>{
            if(accessToken==null){
                try {
                    const res = await fetchAccessToken()
                    const newToken = res.data.accessToken;
                    if(newToken){
                        setAccessToken(newToken); 
                    }else {
                        return navigate('/SignIn'); // ถ้า refresh ไม่ได้ ให้ไป login ใหม่
                    }
                } catch (error) {
                    return navigate('/SignIn');
                }
            }
    }
    useEffect(() => {    
        refreshToken()
    }, [accessToken, navigate]);
    useEffect(() => {
        if(accessToken){
            fetchUserProfile()
        }
    }, [accessToken]);

    return (accessToken?
        <div className="min-h-screen bg-gray-50">
            <Navbar userProfile={userProfile}/>

            <Outlet />
        </div>:
        <div>
            Loading...
        </div>
      )

}

export default UserRoute
