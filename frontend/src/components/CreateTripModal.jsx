import React,{useState} from 'react'
import { Plus, Users, Calculator, Receipt, LogIn, UserPlus, Home, Menu as MenuIcon, X, Trash2, Edit3 } from 'lucide-react';
import { createTrip } from '../functions/tripManage';
import { useNavigate } from 'react-router';
import { useAuth } from '../contextProvider/AuthProvider';
import { ensureToken } from '../utils/checkToken';
import { fetchAccessToken } from '../functions/accessTokenFetch';
import { twoStepTryFetch } from '../services/apiCallwithToken';
import toastifyService from '../services/toastifyService';
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
      const responseCreateTrip = await toastifyService.promise(
        twoStepTryFetch(createTrip, payload, accessToken, setAccessToken),
        {
          pending: 'Creating your trip...',
          success: 'Trip Created Successfully !'
        }
      );
      return navigate('/User/Dashboard');

    } catch (err) {
      console.log('Create Trip Error:', err);
      if(err.response.status ===401){
        toastifyService.errorOption(401);
        return navigate('/SignIn');
      }
      if(err.response.status ===403){
        toastifyService.errorOption(403);
        return navigate('/SignIn');
      }
      toastifyService.errorOption(500);
      return navigate('/User/Dashboard');
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
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
                className="flex-1 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
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
