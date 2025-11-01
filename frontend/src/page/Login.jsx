import React,{useState} from 'react'
import { Plus, Users, Calculator,Calendar, Receipt, LogIn, UserPlus, Home, Menu as MenuIcon, X, Trash2, Edit3 } from 'lucide-react';
import { login,register,usefetchToken } from '../functions/login';
import { useAuth } from '../contextProvider/AuthProvider';
import { useNavigate } from 'react-router';
import Cookies from 'universal-cookie';

const LoginPage = () => {
    const {accessToken,setAccessToken} = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const Navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
        handleLogin(formData.email, formData.password);
    } else {
        handleRegister(formData.name, formData.email, formData.password);
    }
    };
    const handleLogin = async (email,password)=>{
        const cookies = new Cookies(null, { path: '/' });
        cookies.set('myCat', 'Pacman');
        const newData = {email,password};
        // const responsefromFetch = await usefetchToken(newData)
        // const res = responsefromFetch.json()
        const response = await login(newData);
        console.log(response)
        console.log(response.data.accessToken)
        if(response.status===200){
            console.log("doing navigate ??")
            setAccessToken(response.data.accessToken)
            // client
            Navigate('/User/DashBoard')
        }

    }
    const handleRegister = async (name,email,password)=>{
        const newData = {username:name,email,password}
        const response = await register(newData)
    }

    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
            <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Receipt className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">SplitEase</h1>
            <p className="text-gray-600 mt-2">Split bills with friends easily</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300  text-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
            </div>
            )}
            
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300  text-gray-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            </div>

            <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
            {isLogin ? 'Sign In' : 'Create Account'}
            </button>
        </form>

        <div className="mt-6 text-center">
            <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
        </div>
        </div>
    </div>
    );
};


export default LoginPage
