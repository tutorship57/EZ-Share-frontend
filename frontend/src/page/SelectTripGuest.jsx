import React from 'react'
import CheckBoxList from '../components/CheckBoxList'
import { useNavigate,useParams } from 'react-router';
import { useAuth } from "../contextProvider/AuthProvider";
import { addTripGuests } from '../functions/tripGuestManage';
import { twoStepTryFetch } from '../services/apiCallwithToken';
import toastifyService from '../services/toastifyService';
const SelectTripGuest = () => {
    const {accessToken,setAccessToken} = useAuth();
  
    const Navigate = useNavigate();
    const idParam = useParams().id;
  
    const handleSubmit = async(selected) => {
      if(!accessToken){
        Navigate('/SignIn');
        return ;
      }
      const payload = {
            arrayGuestId:selected,
            tripId:idParam
      }
      try {
        const responseAddTripGuests = await toastifyService.promise(
        twoStepTryFetch(addTripGuests,payload,accessToken,setAccessToken),
        {
          pending: 'Adding Guests...',
          success: 'Guests Added Successfully !',
        }
        );
        Navigate(`/User/Dashboard/TripDetail/${idParam}`);
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
        return Navigate(`/User/Dashboard/TripDetail/${idParam}`);
      }

    }
  return (
    <div>
      <CheckBoxList handleSubmit={handleSubmit}/>
    </div>
  )
}

export default SelectTripGuest
