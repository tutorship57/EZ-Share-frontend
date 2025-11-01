import React,{useState} from 'react'
import { Plus, Users, Calculator, Receipt, LogIn, UserPlus, Home, Menu as MenuIcon, X, Trash2, Edit3 } from 'lucide-react';
const logout = () => { // set cookie , clear cookies 
  //     setUser(null);
  //     setCurrentPage('login');
  //     setTrips([]);
  //     setCurrentTrip(null);
    };

const navbar = () => {
  const [user, setUser] = useState(null);
  return (
    <nav className="bg-white shadow-sm border-b">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <Receipt className="w-8 h-8 text-indigo-600 mr-2" />
          <span className="text-xl font-bold text-gray-800">SplitEase</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Welcome, {user?.name}</span>
          <button
            onClick={logout}
            className="text-red-600 hover:text-red-800 font-medium"
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
