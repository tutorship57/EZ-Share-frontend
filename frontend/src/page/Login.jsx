import React, { useState } from "react";
import {
  Plus,
  Users,
  Calculator,
  Calendar,
  Receipt,
  LogIn,
  UserPlus,
  Home,
  Menu as MenuIcon,
  X,
  Trash2,
  Edit3,
} from "lucide-react";
import { loginFunc, registerFunc, usefetchToken } from "../functions/login";
import { useAuth } from "../contextProvider/AuthProvider";
import { useNavigate } from "react-router";
import toastifyService from "../services/toastifyService";
import LoginForm from "../components/LoginForm";
import { useForm } from "react-hook-form";
const LoginPage = () => {
  const { accessToken, setAccessToken } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const Navigate = useNavigate();
  // const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (isLogin) {
      handleLogin(data.email, data.password);
      // handleLogin(formData.email, formData.password);
    } else {
      handleRegister(data.name, data.email, data.password);
      // handleRegister(formData.name, formData.email, formData.password);
    }
  };
  const handleLogin = async (email, password) => {
    const newData = { email, password };
    try {
      const respondLogin = await toastifyService.promise(loginFunc(newData), {
        pending: "pending",
        success: "Login Successful !",
        error: "Login Failed Please Try Again",
      });
      console.log("doing navigate ??");
      setAccessToken(respondLogin.data.accessToken);
      Navigate("/User/DashBoard");
    } catch (error) {
      console.log("Login Error", error);
    }
  };
  const handleRegister = async (name, email, password) => {
    const newData = { username: name, email, password };
    try {
      const responseRegister = await toastifyService.promise(
        registerFunc(newData),
        {
          pending: "Creating your account...",
          success: "Account Created Successfully !",
          error: "Account Creation Failed Please Try Again",
        }
      );
      setIsLogin(!isLogin);
    } catch (err) {
      console.log("Register Error", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center max-h-screen justify-center p-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none]">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md ">
        <div className="text-center mb-6">
            <div>
          {/* <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"> */}
            {/* <Receipt className="w-8 h-8 text-white" /> */}
            <img 
                src="/src/assets/logo-PhotoroomCrop.svg" 
                alt="EZ-share Logo"
                className="w-[700px] h-auto drop-shadow-2xl"
            />
          </div>
          {/* <h1 className="text-3xl font-bold text-gray-800">EZ-Share</h1> */}
          <p className="text-gray-600 mt-2">Split bills with friends easily</p>
        </div>
        <LoginForm
          handleSubmit={handleSubmit}
          isLogin={isLogin}
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
        />

        <div className="mt-3 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
