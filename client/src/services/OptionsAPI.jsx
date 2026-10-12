export const getAllOptions = async () => {
  const response = await fetch('/api/options')
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Could not load options.')
  return data
}

export const getOption = async (id) => {
  const response = await fetch(`/api/options/${id}`)
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Could not load option.')
  return data
}
