// combos that can't be built. Same rules as client/src/utilities/validation.js
export const BASE_PRICE = 25000

export const RULES = [
  {
    a: { feature: 'roof', value: 'convertible' },
    b: { feature: 'interior', value: 'racing' },
    message: 'Racing Buckets need a roll cage, which won\'t fit in a Convertible.'
  },
  {
    a: { feature: 'wheels', value: 'offroad' },
    b: { feature: 'interior', value: 'racing' },
    message: 'Racing Buckets are built for the track, not Off-Road wheels.'
  }
]

// picked = { exterior: option, roof: option, ... }
export const findProblems = (picked) =>
  RULES.filter(rule =>
    picked[rule.a.feature]?.value === rule.a.value &&
    picked[rule.b.feature]?.value === rule.b.value
  ).map(rule => rule.message)
