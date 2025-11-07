import React,{useEffect, useState} from 'react'
import Navbar from '../layout/Navbar';
import { Plus, Users,Calendar,Utensils, Calculator, Receipt, LogIn, UserPlus, Home, Menu as MenuIcon, X, Trash2, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { getAllTrips } from '../functions/tripManage';
import CreateTripModal from '../components/CreateTripModal';
import { useAuth } from '../contextProvider/AuthProvider';
const DashBoard = () => {
    const [showCreateTrip, setShowCreateTrip] = useState(false);
    const Navigate = useNavigate()
    const [trips, setTrips] = useState([]);
    const {accessToken,setAccessToken} = useAuth();
    useEffect(() => {
      async function fetchTrips() {
        try {
          const res = await getAllTrips(accessToken); // URL API ของคุณ
          console.log('Response:', res.data);
          setTrips(res.data.trips); // สมมติ API ส่ง [{},{}] มา
        } catch (err) {
          console.error(err);
        } 
        
      }
  
      fetchTrips();
    }, [Navigate]);
  
    // const handleViewDetail = ()=>{
    //   Navigate(`TripDetail`)
    // }
    const handleViewDetail = (id)=>{
      console.log("this is dashboard trip id ",id)
      Navigate(`TripDetail/${id}`)
    }

    const handleCreateTrip = ()=>{
      Navigate('NewTrip')
    }
    return (
      <div className="">
        {/* <Navbar/> */}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Your Trip Meals</h1>
            <button
              onClick={handleCreateTrip}
              className="bg-violet-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-violet-700 transition-colors flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Trip Meal 
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 text-amber-950 lg:grid-cols-3 gap-6">
          {trips.map(trip => (
              <div key={trip.trip_id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{trip.tripName}</h3>
                <p className="text-gray-600 mb-4">{trip.Description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(trip.Date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <Utensils className="w-4 h-4 mr-1" />
                    {trip?._count?.meals || 0} meals
                  </span>
                </div>
                <button
                  onClick={()=>handleViewDetail(trip.trip_id)}
                  className="w-full bg-violet-100 text-violet-700 py-2 rounded-lg font-medium hover:bg-indigo-200 transition-colors"
                >
                  View Details
                </button>
              </div>
            ))}
           
          </div>

          {trips.length === 0 && (
            <div className="text-center py-12">
              <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No trip meals yet</h3>
              <p className="text-gray-500">Create your first trip meal to get started</p>
            </div>
          )}
        </div>

        {showCreateTrip && <CreateTripModal onClose={() => setShowCreateTrip(false)} />}
      </div>
    );
  };

export default DashBoard
