const BASE = '/api/cars'

// throws the server's error message so pages can show it
const handle = async (response) => {
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Something went wrong.')
  return data
}

export const getAllCars = async () => handle(await fetch(BASE))

export const getCar = async (id) => handle(await fetch(`${BASE}/${id}`))

export const createCar = async (car) => handle(await fetch(BASE, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(car)
}))

export const updateCar = async (id, car) => handle(await fetch(`${BASE}/${id}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(car)
}))

export const deleteCar = async (id) => handle(await fetch(`${BASE}/${id}`, { method: 'DELETE' }))
