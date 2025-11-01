import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router'
import CreateTripModal from '../components/CreateTripModal'
const CreateTrip = () => {
    const Navigate = useNavigate()
    const HandleOnClose = ()=>{
        
        Navigate('/User/DashBoard')
    }
    return (
        <div>
            <CreateTripModal onClose={HandleOnClose} />
        </div>
    )
}

export default CreateTrip
