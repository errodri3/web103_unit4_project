import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CarPicture from '../components/CarPicture'
import CarSpecs from '../components/CarSpecs'
import DeleteButton from '../components/DeleteButton'
import { getCar, deleteCar } from '../services/CarsAPI'
import { formatPrice } from '../utilities/calcPrice'
import '../App.css'
import '../css/Car.css'

const CarDetails = ({ title }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        document.title = title
        const load = async () => {
            try {
                setCar(await getCar(id))
            } catch (err) {
                setError(err.message)
            }
        }
        load()
    }, [id, title])

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
            <article className='details'>
                <CarPicture color={car.exterior_value} roof={car.roof_value}
                    wheels={car.wheels_value} interior={car.interior_value} />
                <h2>{car.name}</h2>
                <p className='price'>{formatPrice(car.total_price)}</p>
                <CarSpecs car={car} />
                <div className='card-actions'>
                    <Link to='/customcars' role='button' className='secondary'>Back</Link>
                    <Link to={`/edit/${car.id}`} role='button'>Edit</Link>
                    <DeleteButton onDelete={handleDelete} />
                </div>
            </article>
        </div>
    )
}

export default CarDetails
