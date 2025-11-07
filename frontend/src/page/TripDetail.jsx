import React,{useEffect, useState} from 'react'
import { Plus, Users,User,Calendar,Utensils, Calculator, Receipt, LogIn,LogOut, UserPlus, Home, Menu as MenuIcon, X, Trash2, Edit3 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

import { useAuth } from '../contextProvider/AuthProvider';
import { fetchAccessToken } from '../functions/accessTokenFetch';
import { getAllGuest } from '../functions/guestManage';
import { getAllTripGuests } from '../functions/tripGuestManage';
import { getAllMeals } from '../functions/mealManage';
import { twoStepTryFetch, twoStepTryFetchCustom, twoStepTryFetchWithId } from '../services/apiCallwithToken';
const TripDetail = () => {
    const [activeTab, setActiveTab] = useState('guests');
    const [showAddGuest, setShowAddGuest] = useState(false);
    const [showAddMeal, setShowAddMeal] = useState(false);
    const [currentTrip, setCurrentTrip] = useState([]);
    const [allMeals,setAllMeals] = useState([]);
    const [allGuest,setAllGuest] = useState([]);
    const [tripGuest,setTripGuest] = useState([]);
    const {accessToken,setAccessToken} = useAuth();
    const Navigate = useNavigate()
    const {tripId} = useParams()

    
    useEffect(() => {
      if (!accessToken) {
        Navigate('/SignIn');
        return;
      }

      const fetchAll = async () => {
        try {
          // เรียกพร้อมกันทั้งหมด
          const [guestRes, tripGuestRes, mealRes] = await Promise.all([
            twoStepTryFetchCustom(getAllGuest, accessToken, setAccessToken),
            twoStepTryFetchWithId(tripId, getAllTripGuests, accessToken, setAccessToken),
            twoStepTryFetchWithId(tripId, getAllMeals, accessToken, setAccessToken)
          ]);

          // update state ทีเดียว
          setAllGuest(guestRes.data.guests);
          setTripGuest(tripGuestRes.data.tripGuests);
          setAllMeals(mealRes.data.meals);
        } catch (err) {
          console.error('Fetch error:', err);
          Navigate('/SignIn');
        }
      };
      fetchAll();
    }, [Navigate, accessToken, tripId, setAccessToken]);
   

    const handleManageMeal = (mealId)=>{
      Navigate(`/User/DashBoard/TripDetail/${tripId}/MealDetail/${mealId}`)
    }
    const handleSelectTripGuest = ()=>{
      Navigate(`/User/DashBoard/TripDetail/${tripId}/SelectTripGuest`)
    }
    const handleAddGuest = ()=>{
      Navigate(`/User/DashBoard/TripDetail/${tripId}/AddGuest`)
    }
    const handleAddMeal = ()=>{
      Navigate(`/User/DashBoard/TripDetail/${tripId}/AddMeal`)
    }
    return (
      <div className="min-h-screen bg-gray-50 text-black dark:text-gray-700">
        
        {/* <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ">
        </div> */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ">
          <div className="bg-white rounded-xl shadow-md">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {['guests', 'meals'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm capitalize ${
                      activeTab === tab
                        ? 'border-indigo-500 text-violet-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab === 'guests' ? 'Trip Guests' : 'Meals'}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'guests' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">All-Guests</h2>
                    <button
                      onClick={handleAddGuest}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Guest
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-40 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none]">
                    {allGuest?.map(guest => (
                      <div key={guest.guest_id} className="bg-gray-50 rounded-lg p-4 flex items-center">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">{guest.guest_name}</p>
                          {/* {guest.email && (
                            <p className="text-sm text-gray-600">{guest.email}</p>
                          )} */}
                        </div>
                      </div>
                    ))}
                  </div>

                  {allGuest?.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No guests added yet. Add guests who will participate in meals.
                    </div>
                  )}
                  <div className="flex justify-between items-center my-6 ">
                    <h2 className="text-xl font-semibold">Trip Guests Selected</h2>
                    <button
                      onClick={handleSelectTripGuest}
                      className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Guest to Your Trip
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-40 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none]">
                    {tripGuest?.map(guest => (
                      <div key={guest.guest_id} className="bg-gray-50 rounded-lg p-4 flex items-center">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-violet-600" />
                        </div>
                        <div>
                          <p className="font-medium">{guest.guest_table.guest_name}</p>
                          {/* {guest.email && (
                            <p className="text-sm text-gray-600">{guest.email}</p>
                          )} */}
                        </div>
                      </div>
                    ))}
                  </div>

                  
                </div>
              )}

              {activeTab === 'meals' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Trip Meals</h2>
                    <button
                      onClick={handleAddMeal}
                      className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 flex items-center"
                      disabled={tripGuest?.length === 0}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Meal
                    </button>
                  </div>

                  {tripGuest?.length === 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <p className="text-yellow-800">Please add trip guests before creating meals.</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allMeals?.map(meal => {
                      const host = tripGuest.find(g => g.guest_id === meal.meal_host);
                      // console.log("this is host",host)
                      return (
                        <div key={meal.meal_id} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-center mb-4">
                            <div className={meal.meal_status==='pending'?"bg-amber-300 p-2 rounded-lg mr-3":"bg-lime-500 p-2 rounded-lg mr-3"}>
                              {}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">{meal.meal_name}</h3>
                              <p className="text-sm text-gray-600">{meal.meal_at}</p>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <p className="text-sm text-gray-600">
                              Host: <span className="font-medium">{host?.guest_table.guest_name || 'Not assigned'}</span>
                            </p>
                            <p className="text-sm text-gray-600">
                              Status: <span className="capitalize font-medium">{meal.meal_status}</span>
                            </p>
                          </div>

                          <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {tripGuest?.length?  tripGuest.length: 0} guests
                            </span>
                            <span className="flex items-center">
                              <MenuIcon className="w-4 h-4 mr-1" />
                              {meal._count?.menuList? meal._count?.menuList: 0} items
                            </span>
                          </div>

                          <button
                            onClick={()=>handleManageMeal(meal.meal_id)}
                            className="w-full bg-violet-600 text-white py-2 rounded-lg font-medium hover:bg-violet-700 transition-colors"
                          >
                            Manage Meal
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {(allMeals.length === 0  && tripGuest?.length > 0) && (
                    <div className="text-center py-12">
                      <Utensils className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-600 mb-2">No meals added yet</h3>
                      <p className="text-gray-500">Create your first meal to start splitting bills</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {showAddGuest && <AddGuestModal onClose={() => setShowAddGuest(false)} />}
        {showAddMeal && <CreateMealModal onClose={() => setShowAddMeal(false)} />}
      </div>
    );
  };

  export default TripDetail;