import React,{ useState,useEffect} from 'react'
import { Plus, Users,Calendar,Utensils, Calculator, Receipt, LogIn, UserPlus, Home, Menu as MenuIcon, X, Trash2, Edit3 } from 'lucide-react';
import { useNavigate,useParams } from 'react-router';
import { createMeal } from '../functions/mealManage';
import { useAuth } from '../contextProvider/AuthProvider';
import { fetchAccessToken} from '../functions/accessTokenFetch';
import { getAllTripGuests } from '../functions/tripGuestManage';
import { ensureToken } from '../utils/checkToken';
import toastifyService from '../services/toastifyService';
import { twoStepTryFetchCustom, twoStepTryFetchWithId } from '../services/apiCallwithToken';
const CreateMealModal = ({ onClose }) => {
      const {accessToken, setAccessToken} = useAuth()
      const {id} = useParams();
      const [tripGuest,setTripGuest] = useState(null);
      const [formData, setFormData] = useState({ 
        meal_name: '', 
        meal_at: '', 
        meal_host: '' 
      });
      const Navigate = useNavigate();
      useEffect(() => {
            if(!accessToken){
              Navigate('/SignIn')
            }
            async function fetchTrips() {
              try {
                const responseTripGuest = await twoStepTryFetchWithId(id,getAllTripGuests,accessToken,setAccessToken);
                setTripGuest(responseTripGuest.data.tripGuests);
                return;
              }
              catch (err) {
                console.log("Fetch Trip Guests Error:", err);
              }
            }
            fetchTrips();
          },[Navigate]);
  
      const handleSubmit = async () => {
        try {
          const responseCreatMeal = await toastifyService.promise(
            twoStepTryFetchCustom(createMeal,accessToken,setAccessToken,id,formData),
            {
              pending: 'Creating your meal...',
              success: 'Meal Created Successfully !'
            }
          )
          Navigate(`/User/DashBoard/TripDetail/${id}`)
          return ;  
        } catch (error) {
          if(error.response.status ===401){
            toastifyService.errorOption(401);
            return Navigate('/SignIn');
          }
          if(error.response.status ===403){
            toastifyService.errorOption(403);
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
              <h2 className="text-xl font-semibold">Create New Meal</h2>
              <button onClick={onClose}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
  
            <div  className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Breakfast at Hotel, Lunch at Restaurant"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={formData.meal_name}
                  onChange={(e) => setFormData({...formData, meal_name: e.target.value})}
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meal Time/Type *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Breakfast 8:00 AM, Lunch 12:30 PM, Dinner 7:00 PM"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={formData.meal_at}
                  onChange={(e) => setFormData({...formData, meal_at: e.target.value})}
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meal Host *</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={formData.meal_host}
                  onChange={(e) => setFormData({...formData, meal_host: e.target.value})}
                >
                  <option value="">Select a host</option>
                  {tripGuest?.map(guest => (
                    <option key={guest.guest_id} value={guest.guest_id}>
                      {guest.guest_table.guest_name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  The host is responsible for organizing this meal
                </p>
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
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Create Meal
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default CreateMealModal
