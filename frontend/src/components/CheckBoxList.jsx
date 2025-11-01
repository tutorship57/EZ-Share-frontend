import React, { useState,useEffect } from "react";
import { Plus, Users,Calendar,Utensils, Calculator, Receipt, LogIn, UserPlus, Home, Menu as MenuIcon, X, Trash2, Edit3 } from 'lucide-react';
import { useNavigate,useParams } from 'react-router';
import { useAuth } from "../contextProvider/AuthProvider";
import { getAllGuest } from "../functions/guestManage";
import { ensureToken } from "../utils/checkToken";
import { addTripGuests, getAllTripGuests } from "../functions/tripGuestManage";
const CheckBoxList = ({handleSubmit}) => {
  const [selected, setSelected] = useState([]);
  const [guests, setGuests] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [tripGuests,setTripGuests] = useState([]);
  const {accessToken,setAccessToken} = useAuth();
  const Navigate = useNavigate();
  const idParam = useParams().id;
  console.log(idParam)

  useEffect(() => {
    
    async function fetchGuests() {
        if(!accessToken) {
            Navigate('/SignIn');
            return ;
          }
      try { 
        const resTripGuest = await getAllTripGuests(idParam,accessToken)
        const resGuest =  await getAllGuest(accessToken)
        setGuests(resGuest.data.guests)
        setTripGuests(resTripGuest.data.tripGuests)
        return ;
      }catch(err){
        console.log(err)
        if(err.response.status !==403){
          Navigate('/SignIn');
          return;
        }
      }

      const newAccessToken = await ensureToken(accessToken,setAccessToken);
      if(!newAccessToken){
        Navigate('/SignIn');
        return;
      }
      try {
        const resTripGuest = await getAllTripGuests(idParam,accessToken)
        const resGuest =  await getAllGuest(accessToken)
        setGuests(resGuest.data.guests)
        setTripGuests(resTripGuest.data.tripGuests)
      }catch(err){
        Navigate('/SignIn');
        return ;
      }
      
    }
    fetchGuests();
  },[])
  
  // const handleSubmit = async() => {
  //     if(!accessToken){
  //         Navigate('/SignIn');
  //     }
  //     console.log("this is selected",selected)
  //     const payload = {
  //         arrayGuestId:selected,
  //         tripId:idParam
  //     }
  //     console.log("this is payload",payload)
  //     try{
  //       const res = await addTripGuests(payload,accessToken);

  //       console.log(res)
  //     }catch(err){
  //       console.log(err)
  //       if(err.response.status!==403){
  //           return Navigate('/SignIn');
  //       }
  //     }
  //     const newAccessToken = await ensureToken(accessToken,setAccessToken);
  //     try {
  //       const res = await addTripGuests(payload,newAccessToken);
  //       if(res.status===200){
  //         return Navigate(`/User/Dashboard/TripDetail/${idParam}`);
  //       }
  //     } catch (error) {
  //       Navigate('/SignIn');
  //       return;
  //     }
  // }
  const togglePerson = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );

  };

  const onClose = ()=>{
    Navigate(`/User/Dashboard/TripDetail/${idParam}`);
  }

  return (
    <div className="fixed inset-0 z-50max-h-screen   bg-black text-gray-700 flex items-center justify-center p-6 ">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl">
        <div className="flex flex-col ">
        <button onClick={onClose} className="self-end ">
            <X className="w-8 h-8 text-gray-500 relative bottom-5 left-5" />
        </button>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Select TripGuest
        </h2>
        </div>
        
        <div className="space-y-3 max-h-70 overflow-y-auto  [scrollbar-width:none] [-ms-overflow-style:none]">
          {guests.map((guest) => (
            <div key={guest.guest_id} className="relative">
              <input
                type="checkbox"
                id={`guest-${guest.guest_id}`}
                checked={selected.includes(guest.guest_id)}
                onChange={() => togglePerson(guest.guest_id)}
                className="peer hidden"
              />
              <label
                htmlFor={`guest-${guest.guest_id}`}
                className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer transition-all duration-300 hover:bg-gray-100 hover:translate-x-1 peer-checked:bg-indigo-100 peer-checked:translate-x-0"
              >
                <div className="w-6 h-6 border-2 border-indigo-500 rounded-md mr-4 flex items-center justify-center peer-checked:border-white peer-checked:bg-white transition-all duration-300">
                  {selected.includes(guest.guest_id) && (
                    <svg
                      className="w-4 h-4 text-indigo-500"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
                <span className="font-medium text-lg">{guest.guest_name}</span>
              </label>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-purple-50 max-h-25 rounded-xl  overflow-y-auto  [scrollbar-width:none] [-ms-overflow-style:none]">
          <p className="text-sm text-gray-600 mb-2">
            เลือกแล้ว: {selected.length} คน
          </p>
          {selected.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selected.map((id) => {
                const guest = guests.find((p) => p.guest_id === id);
                return (
                  <span
                    key={id}
                    className="px-3 py-1 bg-indigo-300 text-white rounded-full text-sm"
                  >
                    {guest.guest_name}
                  </span>
                );
              })}
            </div>
          )}
        </div>
        <button
          onClick={()=>handleSubmit(selected)}
          className="w-full bg-indigo-600 text-white mt-6 py-3 rounded-lg font-medium hover:bg-indigo-200 transition-colors"
        >
          add guest to trip
        </button>
      </div>
    </div>
  );
};

export default CheckBoxList;
