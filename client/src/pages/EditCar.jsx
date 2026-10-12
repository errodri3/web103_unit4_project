import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CarForm from '../components/CarForm'
import DeleteButton from '../components/DeleteButton'
import { getCar, updateCar, deleteCar } from '../services/CarsAPI'
import '../App.css'
import '../css/Car.css'

const EditCar = ({ title }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        document.title = title
        const load = async () => {
            try {
                const data = await getCar(id)
                setCar({
                    name: data.name,
                    exterior_id: data.exterior_id,
                    roof_id: data.roof_id,
                    wheels_id: data.wheels_id,
                    interior_id: data.interior_id
                })
            } catch (err) {
                setError(err.message)
            }
        }
        load()
    }, [id, title])

    const handleUpdate = async (updated) => {
        await updateCar(id, updated)
        navigate(`/customcars/${id}`)
    }

    const handleDelete = async () => {
        try {
            await deleteCar(id)
            navigate('/customcars')
        } catch (err) {
            setError(err.message)
        }
    }

    if (error) return <div className='page'><p className='error-msg'>⚠️ {error}</p></div>
    if (!car) return <div className='page'><p aria-busy='true'>Loading...</p></div>

    return (
        <div className='page'>
            <h2>Edit {car.name}</h2>
            <div className='card-actions'><DeleteButton onDelete={handleDelete} /></div>
            <CarForm initial={car} submitLabel='Update car' onSubmit={handleUpdate} />
        </div>
    )
}

export default EditCar
