import React,{useState} from 'react'
import { Plus, Users, Calculator, Receipt, LogIn, UserPlus, Home, Menu as MenuIcon, X, Trash2, Edit3, User } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contextProvider/AuthProvider';
import { logout } from '../functions/login';


const navbar = ({userProfile}) => {
  const {accessToken, setAccessToken} = useAuth();
  const Navigate = useNavigate();
  const Handlelogout =  async () => { // set cookie , clear cookies 
      try {
        const responseLogout = await logout(accessToken);
        if(responseLogout.status===200){
          setAccessToken(null);
          setUser(null);
          return Navigate('/SignIn');
        }
      }catch (error) {
        console.log(error)
      }
  };
  return (
    <nav className="bg-white shadow-sm border-b">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <Receipt className="w-8 h-8 text-indigo-600 mr-2" />
          <span className="text-xl font-bold text-gray-800">SplitEase</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-1 bg-indigo-100 px-2 py-1 rounded-xl">
            <User className="w-5 h-5 text-indigo-600 rounded-full  "/>
            <span className="text-indigo-600 ">{userProfile?.username}</span>
          </div>
       
          <button
            onClick={Handlelogout}
            className=" bg-red-100 px-2 py-1 rounded-xl text-red-600 hover:text-red-800 font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default navbar
