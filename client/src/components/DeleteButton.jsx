import React, { useState } from 'react'

// asks once before deleting, without a pop-up
const DeleteButton = ({ onDelete }) => {
  const [sure, setSure] = useState(false)
  return (
    <button type='button' className={`delete-btn ${sure ? 'confirm' : ''}`}
      onClick={() => (sure ? onDelete() : setSure(true))}
      onMouseLeave={() => setSure(false)}>
      {sure ? 'Click to confirm' : 'Delete'}
    </button>
  )
}

export default DeleteButton
