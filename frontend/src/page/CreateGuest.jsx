import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom' 
import AddGuestModal from '../components/AddGuestModel'
import { useAuth } from '../contextProvider/AuthProvider'

const CreateGuest = () => {
    const Navigate = useNavigate()
    const {id} = useParams()
    const handleonClose = ()=>{
        Navigate(`/User/DashBoard/TripDetail/${id}`)
    }
  return (
    <div className='text-black'>
      <AddGuestModal onClose={handleonClose}/>
    </div>
  )
}

export default CreateGuest
