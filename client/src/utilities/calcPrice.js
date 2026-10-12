export const BASE_PRICE = 25000

export const FEATURES = ['exterior', 'roof', 'wheels', 'interior']

// selection = { exterior_id: 1, roof_id: 6, ... }
export const getPickedOptions = (options, selection) => {
  const picked = {}
  for (const f of FEATURES) {
    picked[f] = options.find(o => o.id === Number(selection[`${f}_id`]))
  }
  return picked
}

export const calcTotalPrice = (options, selection) => {
  const picked = getPickedOptions(options, selection)
  return BASE_PRICE + Object.values(picked).reduce((sum, o) => sum + (o ? o.price : 0), 0)
}

export const formatPrice = (amount) => `$${Number(amount).toLocaleString('en-US')}`
