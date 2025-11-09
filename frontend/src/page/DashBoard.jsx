import React,{useEffect, useState} from 'react'
import Navbar from '../layout/Navbar';
import { Plus, Users,Calendar,Utensils, Calculator, Receipt, LogIn, UserPlus, Home, Menu as MenuIcon, X, Trash2, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { getAllTrips } from '../functions/tripManage';
import CreateTripModal from '../components/CreateTripModal';
import { useAuth } from '../contextProvider/AuthProvider';
import { deleteTripById } from '../functions/tripManage';
import DeleteModal from '../components/DeleteModal';
import toastifyService from '../services/toastifyService';
import { twoStepTryFetchWithId } from '../services/apiCallwithToken';
const DashBoard = () => {
    const [showCreateTrip, setShowCreateTrip] = useState(false);
    const [showDeleteTrip, setShowDeleteTrip] = useState(false);
    const [tripToDelete, setTripToDelete] = useState(null);
    const [tripToEdit, setTripToEdit] = useState(null);

    const Navigate = useNavigate()
    const [trips, setTrips] = useState([]);
    const {accessToken,setAccessToken} = useAuth();
    const fetchTrips = async()=> {
        try {
          const res = await getAllTrips(accessToken); // URL API ของคุณ
          console.log('Response:', res.data);
          setTrips(res.data.trips); // สมมติ API ส่ง [{},{}] มา
        } catch (err) {
          console.error(err);
        } 
        
    }
    useEffect(() => {
      
  
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
    const handleDeleteTrip =async (id)=>{  
      try {
        const DeleteTripRes =await toastifyService.promise(
          twoStepTryFetchWithId(id,deleteTripById,accessToken,setAccessToken),{
            pending: 'Deleting your trip...',
            success: 'Trip Deleted Successfully !'
          }
        )
        fetchTrips();
        setShowDeleteTrip(false);
        return ;
      } catch (error) {
        console.log("Delete Trip Error:",error)
        if(error.response.status ===401){
          toastifyService.errorOption(401);
          return Navigate('/SignIn');
        }
        if(error.response.status ===403){
          toastifyService.errorOption(403);
          return Navigate('/SignIn');
        }
        toastifyService.errorOption(500);
      }
    }
    const openDeleteModal = (trip)=>{
      setShowDeleteTrip(true);
      setTripToDelete(trip);
    }
    const openEditModal = (trip)=>{
      setShowDeleteTrip(true);
      setTripToEdit(trip);
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
                <div className="flex justify-between items-center ">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{trip.tripName}</h3>
                <div className="flex space-x-2">
                {/* <button className="text-violet-500 hover:text-violet-800" >
                  <Edit3 className="w-4 h-4" onClick={()=>openEditModal(trip)}/>
                </button>
                <button className="text-orange-600 hover:text-orange-800 text-sm">
                  <Trash2 className="w-4 h-4" onClick={()=>openDeleteModal(trip)}/>
                </button> */}
                </div>
                </div>
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
        {/* {showDeleteTrip && <DeleteModal onClose={() => setShowDeleteTrip(false)} description={tripToDelete?.Description} category={"Trip"} handleDeleteMenuShare={() => handleDeleteTrip(tripToDelete?.trip_id)} leftContext={new Date(tripToDelete?.Date).toLocaleDateString()} rightContext={tripToDelete?._count?.meals +" Meals"} title={tripToDelete?.tripName} />} */}
        
      </div>
    );
  };

export default DashBoard
