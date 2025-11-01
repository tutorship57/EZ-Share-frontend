import React,{useState} from 'react'
import { Plus, Users, Calculator, Receipt, LogIn, UserPlus, Home, Menu as MenuIcon, X, Trash2, Edit3 } from 'lucide-react';
import { createTrip } from '../functions/tripManage';
import { useNavigate } from 'react-router';
import { useAuth } from '../contextProvider/AuthProvider';
import { ensureToken } from '../utils/checkToken';
import { fetchAccessToken } from '../functions/accessTokenFetch';
const CreateTripModal = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: '', description: '', date: '' })
  const { accessToken, setAccessToken } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!accessToken) {
      navigate('/SignIn');
      return;
    }
  
    const payload = {
      tripName: formData.name,
      description: formData.description,
      date: formData.date,
    };
  
    try {
      // ลองยิงครั้งแรก
      await createTrip(payload, accessToken);
      navigate('/User/Dashboard');
    } catch (err) {
      // ถ้า token หมดอายุ → refresh แล้ว retry
      const newToken = await ensureToken(accessToken, setAccessToken);
      if (!newToken) {
        navigate('/SignIn');
        return;
      }
      setAccessToken(newToken)
      try {
        await createTrip(payload, newToken);
        navigate('/User/Dashboard');
      } catch (err2) {
        console.error("Create trip failed after refresh", err2);
        navigate('/SignIn');
      }
    }
  };
  
  

    return (
      <div className="fixed inset-0 text-gray-600 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-gray-800 font-semibold">Create New Trip Meal</h2>
            <button onClick={onClose}>
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trip Name</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Create Trip
              </button>
            </div>
           
          </form>
        </div>
      </div>
    );
  };

export default CreateTripModal
