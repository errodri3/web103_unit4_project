import { pool } from '../config/database.js'
import { BASE_PRICE, findProblems } from '../utilities/validation.js'

const FEATURES = ['exterior', 'roof', 'wheels', 'interior']

// joins each car with the names/values of its chosen options
const CAR_QUERY = `
  SELECT c.*,
    e.name AS exterior_name, e.value AS exterior_value,
    r.name AS roof_name, r.value AS roof_value,
    w.name AS wheels_name, w.value AS wheels_value,
    i.name AS interior_name, i.value AS interior_value
  FROM custom_items c
  JOIN options e ON c.exterior_id = e.id
  JOIN options r ON c.roof_id = r.id
  JOIN options w ON c.wheels_id = w.id
  JOIN options i ON c.interior_id = i.id
`

// checks the body, works out the price on the server, and returns an error message if something is wrong
const checkCar = async (body) => {
  if (!body.name || !body.name.trim()) return { error: 'Please give your car a name.' }

  const ids = FEATURES.map(f => parseInt(body[`${f}_id`]))
  if (ids.some(isNaN)) return { error: 'Please pick an option for every feature.' }

  const results = await pool.query('SELECT * FROM options WHERE id = ANY($1)', [ids])
  const picked = {}
  for (const f of FEATURES) {
    const option = results.rows.find(o => o.id === parseInt(body[`${f}_id`]))
    if (!option || option.feature !== f) return { error: `That ${f} option doesn't exist.` }
    picked[f] = option
  }

  const problems = findProblems(picked)
  if (problems.length > 0) return { error: problems.join(' ') }

  const total = BASE_PRICE + Object.values(picked).reduce((sum, o) => sum + o.price, 0)
  return { values: [body.name.trim(), ...ids, total] }
}

const getCars = async (req, res) => {
  try {
    const results = await pool.query(`${CAR_QUERY} ORDER BY c.id ASC`)
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getCarById = async (req, res) => {
  try {
    const results = await pool.query(`${CAR_QUERY} WHERE c.id = $1`, [parseInt(req.params.id)])
    if (results.rows.length === 0) return res.status(404).json({ error: 'Car not found' })
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createCar = async (req, res) => {
  try {
    const { error, values } = await checkCar(req.body)
    if (error) return res.status(400).json({ error })

    const results = await pool.query(
      `INSERT INTO custom_items (name, exterior_id, roof_id, wheels_id, interior_id, total_price)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      values
    )
    res.status(201).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateCar = async (req, res) => {
  try {
    const { error, values } = await checkCar(req.body)
    if (error) return res.status(400).json({ error })

    const results = await pool.query(
      `UPDATE custom_items
       SET name = $1, exterior_id = $2, roof_id = $3, wheels_id = $4, interior_id = $5, total_price = $6
       WHERE id = $7 RETURNING *`,
      [...values, parseInt(req.params.id)]
    )
    if (results.rows.length === 0) return res.status(404).json({ error: 'Car not found' })
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteCar = async (req, res) => {
  try {
    const results = await pool.query('DELETE FROM custom_items WHERE id = $1 RETURNING *', [parseInt(req.params.id)])
    if (results.rows.length === 0) return res.status(404).json({ error: 'Car not found' })
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default { getCars, getCarById, createCar, updateCar, deleteCar }
