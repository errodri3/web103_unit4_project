import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CarForm from '../components/CarForm'
import { createCar } from '../services/CarsAPI'
import '../App.css'

const CreateCar = ({ title }) => {
    const navigate = useNavigate()

    useEffect(() => { document.title = title }, [title])

    const handleCreate = async (car) => {
        await createCar(car)
        navigate('/customcars')
    }

    return (
        <div className='page'>
            <h2>Build your car</h2>
            <p>Pick your options and watch your car change.</p>
            <CarForm submitLabel='Save car' onSubmit={handleCreate} />
        </div>
    )
}

export default CreateCar
