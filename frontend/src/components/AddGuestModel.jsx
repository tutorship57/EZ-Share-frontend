  import React,{useState,useEffect} from 'react'
  import { Plus, Users,Calendar,Utensils, Calculator, Receipt, LogIn, UserPlus, Home, Menu as MenuIcon, X, Trash2, Edit3 } from 'lucide-react';
  import { useNavigate,useParams } from 'react-router';
  import { createGuest } from '../functions/guestManage';
  import { useAuth } from '../contextProvider/AuthProvider';
  import toastifyService from '../services/toastifyService';
  const AddGuestModal = ({ onClose }) => {
    const {accessToken} = useAuth()
    
    const [formData, setFormData] = useState({ 
        guestName: ''
    });
    const {id} = useParams();
    const Navigate = useNavigate();

    const handleSubmit =async (e) => {
        if (!accessToken) {
            Navigate('/SignIn');
            return;
        }
      e.preventDefault();
      try {
        const responseCreateGuest = toastifyService.promise(
        createGuest(formData,accessToken),
        {
          pending: 'Creating your guest...',
          success: 'Guest Created Successfully !'
        }
        )
        Navigate(`/User/DashBoard/TripDetail/${id}`)
      } catch (error) {
        if(error.response.status !==500){
          toastifyService.errorOption(401);
          return Navigate('/SignIn');
        }
        toastifyService.errorOption(500);
        return Navigate(`/User/DashBoard/TripDetail/${id}`)
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add Trip Guest</h2>
            <button onClick={onClose}>
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <input
                type="text"
                required
                placeholder="Guest name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.name}
                onChange={(e) => setFormData({...formData, guestName: e.target.value})}
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
                Add Guest
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default AddGuestModal