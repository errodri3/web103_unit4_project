import { pool } from './database.js'

// every option a car can have, grouped by feature
// "value" is used by the car picture (a color, or a style name)
const options = [
  { feature: 'exterior', name: 'Racing Red', price: 0, value: '#c1121f' },
  { feature: 'exterior', name: 'Midnight Black', price: 500, value: '#1d1d22' },
  { feature: 'exterior', name: 'Arctic White', price: 500, value: '#e8ecef' },
  { feature: 'exterior', name: 'Electric Blue', price: 1000, value: '#1f5fd6' },
  { feature: 'exterior', name: 'Lime Green', price: 1500, value: '#6cc22e' },

  { feature: 'roof', name: 'Hardtop', price: 0, value: 'hardtop' },
  { feature: 'roof', name: 'Sunroof', price: 1500, value: 'sunroof' },
  { feature: 'roof', name: 'Convertible', price: 4000, value: 'convertible' },

  { feature: 'wheels', name: 'Standard', price: 0, value: 'standard' },
  { feature: 'wheels', name: 'Sport Rims', price: 2000, value: 'sport' },
  { feature: 'wheels', name: 'Off-Road', price: 3000, value: 'offroad' },

  { feature: 'interior', name: 'Cloth', price: 0, value: 'cloth' },
  { feature: 'interior', name: 'Leather', price: 2500, value: 'leather' },
  { feature: 'interior', name: 'Racing Buckets', price: 3500, value: 'racing' }
]

const createTables = async () => {
  await pool.query(`
    DROP TABLE IF EXISTS custom_items;
    DROP TABLE IF EXISTS options;

    CREATE TABLE options (
      id SERIAL PRIMARY KEY,
      feature VARCHAR(50) NOT NULL,
      name VARCHAR(100) NOT NULL,
      price INTEGER NOT NULL,
      value VARCHAR(50) NOT NULL
    );

    CREATE TABLE custom_items (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      exterior_id INTEGER NOT NULL REFERENCES options(id),
      roof_id INTEGER NOT NULL REFERENCES options(id),
      wheels_id INTEGER NOT NULL REFERENCES options(id),
      interior_id INTEGER NOT NULL REFERENCES options(id),
      total_price INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `)
  console.log('🎉 tables created')
}

const seedOptions = async () => {
  for (const option of options) {
    await pool.query(
      'INSERT INTO options (feature, name, price, value) VALUES ($1, $2, $3, $4)',
      [option.feature, option.name, option.price, option.value]
    )
  }
  console.log(`✅ added ${options.length} options`)
}

const seedCars = async () => {
  // a couple of starter cars so the list isn't empty
  await pool.query(`
    INSERT INTO custom_items (name, exterior_id, roof_id, wheels_id, interior_id, total_price) VALUES
      ('Sunday Cruiser', 4, 8, 9, 13, 32500),
      ('Trail Blazer', 5, 6, 11, 12, 29500)
  `)
  console.log('✅ added starter cars')
}

const reset = async () => {
  try {
    await createTables()
    await seedOptions()
    await seedCars()
  } catch (error) {
    console.error('⚠️ error resetting database', error)
  } finally {
    await pool.end()
  }
}

reset()
