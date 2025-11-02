import React from 'react'
import { useNavigate, useParams } from 'react-router'
import CreateMealModal from '../components/CreateMealModal'
const CreateTrip = () => {
    const Navigate = useNavigate()
    const {id} = useParams()
    const HandleOnClose = ()=>{
        Navigate(`/User/DashBoard/TripDetail/${id}`)
    }
    return (
        <div className='text-black'>
            <CreateMealModal onClose={HandleOnClose} />
        </div>
    )
}

export default CreateTrip