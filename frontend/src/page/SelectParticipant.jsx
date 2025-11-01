import React from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../contextProvider/AuthProvider'

const SelectParticipant = () => {
  const {accessToken,setAccessToken} = useAuth();
  const Navigate = useNavigate();
  const idParam = useParams().mealId;
  
//   const handleSubmit = async (selected) =>{
//     if(!accessToken){
//         return Navigate('/SignIn');
//     }
//     const payload = {
//         arrayParticipantId:selected,
//         mealId:idParam
//     }

//     const result = await twoStepTryFetch(,payload,accessToken,setAccessToken)
//     if (result.ok) {
//         Navigate(`/User/Dashboard/TripDetail/${idParam}`);
//     } else {
//         Navigate('/SignIn');
//     }

//   }
  return (
    <div>
    <CheckBoxList handleSubmit={handleSubmit}/>
    </div>
  )
}

export default SelectParticipant
