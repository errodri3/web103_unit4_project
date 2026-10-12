import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CarPicture from '../components/CarPicture'
import CarSpecs from '../components/CarSpecs'
import DeleteButton from '../components/DeleteButton'
import { getAllCars, deleteCar } from '../services/CarsAPI'
import { formatPrice } from '../utilities/calcPrice'
import '../App.css'
import '../css/Car.css'

const ViewCars = ({ title }) => {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        document.title = title
        const load = async () => {
            try {
                setCars(await getAllCars())
            } catch (err) {
                setError(err.message)
            }
            setLoading(false)
        }
        load()
    }, [title])

    const handleDelete = async (id) => {
        try {
            await deleteCar(id)
            setCars(cars.filter(car => car.id !== id))
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className='page'>
            <h2>Custom cars</h2>
            <p>{cars.length} {cars.length === 1 ? 'car' : 'cars'} built so far</p>

            {error && <p className='error-msg'>⚠️ {error}</p>}
            {loading && <p aria-busy='true'>Loading cars...</p>}
            {!loading && cars.length === 0 && !error && (
                <article>No cars yet. <a href='/'>Build the first one!</a></article>
            )}

            <div className='car-grid'>
                {cars.map(car => (
                    <article key={car.id} className='car-card'>
                        <Link to={`/customcars/${car.id}`}>
                            <CarPicture color={car.exterior_value} roof={car.roof_value}
                                wheels={car.wheels_value} interior={car.interior_value} />
                        </Link>
                        <h3>{car.name}</h3>
                        <p className='price'>{formatPrice(car.total_price)}</p>
                        <CarSpecs car={car} />
                        <div className='card-actions'>
                            <Link to={`/customcars/${car.id}`} role='button' className='secondary'>Details</Link>
                            <Link to={`/edit/${car.id}`} role='button'>Edit</Link>
                            <DeleteButton onDelete={() => handleDelete(car.id)} />
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default ViewCars
