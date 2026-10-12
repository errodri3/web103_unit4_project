import { pool } from '../config/database.js'

const getOptions = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM options ORDER BY feature, price, id')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getOptionById = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM options WHERE id = $1', [parseInt(req.params.id)])
    if (results.rows.length === 0) return res.status(404).json({ error: 'Option not found' })
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default { getOptions, getOptionById }
