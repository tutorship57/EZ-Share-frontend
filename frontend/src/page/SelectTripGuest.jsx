import React from 'react'
import CheckBoxList from '../components/CheckBoxList'
import { useNavigate,useParams } from 'react-router';
import { useAuth } from "../contextProvider/AuthProvider";
import { addTripGuests } from '../functions/tripGuestManage';
import { twoStepTryFetch } from '../services/apiCallwithToken';
const SelectTripGuest = () => {
    const {accessToken,setAccessToken} = useAuth();
  
    const Navigate = useNavigate();
    const idParam = useParams().id;
    // const handleSubmit = async(selected) => {
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
    const handleSubmit = async(selected) => {
      if(!accessToken){
            Navigate('/SignIn');
      }
      const payload = {
            arrayGuestId:selected,
            tripId:idParam
      }
    
      const result = await twoStepTryFetch(addTripGuests,payload,accessToken,setAccessToken)
      if (result.ok) {
        Navigate(`/User/Dashboard/TripDetail/${idParam}`);
      } else {
        Navigate('/SignIn');
      }

    }
  return (
    <div>
      <CheckBoxList handleSubmit={handleSubmit}/>
    </div>
  )
}

export default SelectTripGuest
