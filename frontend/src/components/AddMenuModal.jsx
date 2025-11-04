import React,{useState,useEffect} from 'react'
import { useNavigate,useParams } from 'react-router';
import { Plus, Users,Calendar,Utensils, Calculator, Receipt, LogIn, UserPlus, Home, Menu as MenuIcon, X, Trash2, Edit3 } from 'lucide-react';
import { createMenu } from '../functions/menuManage';
import { twoStepTryFetchCustom } from '../services/apiCallwithToken';
import { useAuth } from '../contextProvider/AuthProvider';
import toastifyService from '../services/toastifyService';

const AddMenuModal = ({onClose}) => {
    const {accessToken,setAccessToken} = useAuth()
    const {mealId,tripId} = useParams();
    const Navigate = useNavigate();
    const [formData, setFormData] = useState({ 
        menu_name:'',
        amount:''
    });
    const MenuSubmitHandle =async (e)=>{
      e.preventDefault();
      if(!accessToken){
        Navigate('/SignIn');
        return;
      }
      const payload = {
        menu_name:formData.menu_name,
        amount:parseInt(formData.amount),
      }
      try {
        const responseCreateMenu = await toastifyService.promise(
          twoStepTryFetchCustom(createMenu,accessToken,setAccessToken,mealId,payload),{
            pending: 'Creating your menu...',
            success: 'Menu Created Successfully !'
          }
        )
        Navigate(`/User/DashBoard/TripDetail/${tripId}/MealDetail/${mealId}`)
        return ;
        
      } catch (error) {
        console.log("Create Menu Error:",error)
        if(error.response.status ===401){
          toastifyService.errorOption(401);
          return Navigate('/SignIn');
        }
        if(error.response.status ===403){
          toastifyService.errorOption(403);
          return Navigate('/SignIn');
        }
        toastifyService.errorOption(500);
        Navigate(`/User/DashBoard/TripDetail/${tripId}/MealDetail/${mealId}`)
      }  
    }
  return (
     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add Menu</h2>
            <button onClick={onClose}>
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <form onSubmit={MenuSubmitHandle} className="space-y-4">
            <div className='my-4 flex flex-col gap-2'>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Menu Name *</label>
                    <input
                        type="text"
                        required
                        placeholder="Menu name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={formData.menu_name}
                        onChange={(e) => setFormData({...formData, menu_name: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount *</label>
                    <input
                        type="text"
                        required
                        placeholder="Amount"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    />
                </div>
             
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
                Add Menu
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default AddMenuModal
