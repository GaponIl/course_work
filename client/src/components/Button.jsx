import React from 'react'
import '../style/Button.css'
const Button = ({type, children, onClick, disabled}) => {
  return (
    <button className={`button ${type}`} onClick={onClick} disabled={disabled}>
        {children}
    </button>
  )
}

export default Button
