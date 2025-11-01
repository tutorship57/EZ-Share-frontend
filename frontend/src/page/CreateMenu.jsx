import React from 'react'
import { useNavigate, useParams } from 'react-router'
import AddMenuModal from '../components/AddMenuModal'

const CreateMenu = () => {
    const {tripId,mealId} = useParams()
    const Navigate = useNavigate()
    const HandleOnClose = ()=>{
      Navigate(`/User/DashBoard/TripDetail/${tripId}/MealDetail/${mealId}`)
    }
  return (
    <div className='text-black'>
        <AddMenuModal onClose={HandleOnClose}/>
    </div>
  )
}

export default CreateMenu
