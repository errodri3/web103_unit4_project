import React, { useEffect, useState } from 'react'
import CarPicture from './CarPicture'
import { getAllOptions } from '../services/OptionsAPI'
import { FEATURES, getPickedOptions, calcTotalPrice, formatPrice } from '../utilities/calcPrice'
import { whyBlocked } from '../utilities/validation'
import '../css/Car.css'

const LABELS = { exterior: 'Exterior', roof: 'Roof', wheels: 'Wheels', interior: 'Interior' }

// shared by the Create and Edit pages
const CarForm = ({ initial, submitLabel, onSubmit }) => {
  const [options, setOptions] = useState([])
  const [car, setCar] = useState(initial || { name: '' })
  const [lockCombos, setLockCombos] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllOptions()
        setOptions(data)
        // new cars start with the cheapest option of each feature
        if (!initial) {
          const defaults = {}
          for (const f of FEATURES) defaults[`${f}_id`] = data.find(o => o.feature === f)?.id
          setCar(prev => ({ ...defaults, ...prev }))
        }
      } catch (err) {
        setError(err.message)
      }
    }
    load()
  }, [])

  const picked = getPickedOptions(options, car)

  const choose = (option) => {
    setError('')
    setCar({ ...car, [`${option.feature}_id`]: option.id })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      await onSubmit(car)
    } catch (err) {
      setError(err.message)
    }
    setSaving(false)
  }

  return (
    <form className='car-builder' onSubmit={handleSubmit}>
      <article className='preview-card'>
        <CarPicture
          color={picked.exterior?.value}
          roof={picked.roof?.value}
          wheels={picked.wheels?.value}
          interior={picked.interior?.value}
        />
        <p className='price-label'>Total price</p>
        <p className='price'>{formatPrice(calcTotalPrice(options, car))}</p>
        <p className='base-note'>Base price $25,000 + your options</p>
      </article>

      <article className='options-card'>
        <label htmlFor='name'>Car name</label>
        <input id='name' type='text' placeholder='My dream car' value={car.name || ''}
          onChange={(e) => setCar({ ...car, name: e.target.value })} />

        {FEATURES.map(feature => (
          <fieldset key={feature}>
            <legend>{LABELS[feature]}</legend>
            <div className='option-row'>
              {options.filter(o => o.feature === feature).map(option => {
                const blocked = whyBlocked(option, picked)
                const selected = Number(car[`${feature}_id`]) === option.id
                return (
                  <button type='button' key={option.id}
                    className={`option-btn ${selected ? 'selected' : ''} ${blocked ? 'blocked' : ''}`}
                    disabled={lockCombos && Boolean(blocked) && !selected}
                    title={blocked || ''}
                    onClick={() => choose(option)}>
                    {feature === 'exterior' && <span className='swatch' style={{ background: option.value }} />}
                    {option.name}
                    <small>{option.price ? `+${formatPrice(option.price)}` : 'included'}</small>
                  </button>
                )
              })}
            </div>
          </fieldset>
        ))}

        <label className='lock-toggle'>
          <input type='checkbox' role='switch' checked={lockCombos} onChange={() => setLockCombos(!lockCombos)} />
          Lock options that don't work together
        </label>

        {error && <p className='error-msg' role='alert'>⚠️ {error}</p>}

        <button type='submit' className='submit-btn' disabled={saving}>{saving ? 'Saving...' : submitLabel}</button>
      </article>
    </form>
  )
}

export default CarForm
