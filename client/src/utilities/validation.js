// combos that can't be built. Same rules as server/utilities/validation.js
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

// returns a reason if choosing this option would clash with what's already picked, otherwise null
export const whyBlocked = (option, picked) => {
  for (const rule of RULES) {
    for (const [mine, other] of [[rule.a, rule.b], [rule.b, rule.a]]) {
      if (option.feature === mine.feature && option.value === mine.value &&
          picked[other.feature]?.value === other.value) {
        return rule.message
      }
    }
  }
  return null
}
