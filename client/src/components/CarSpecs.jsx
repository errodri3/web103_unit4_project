import React from 'react'

const CarSpecs = ({ car }) => (
  <ul className='specs'>
    <li><span>🎨 Exterior</span><span>{car.exterior_name}</span></li>
    <li><span>🏠 Roof</span><span>{car.roof_name}</span></li>
    <li><span>🛞 Wheels</span><span>{car.wheels_name}</span></li>
    <li><span>💺 Interior</span><span>{car.interior_name}</span></li>
  </ul>
)

export default CarSpecs
