import React from 'react'
import './ButtonComponent.css'
function ButtonComponent(
    {
        type='button',
        label,
        theme,
        className,
        onClick,
        ...props
    }
) {
  return (
    <button
    {...props}
    className={`Button_${theme} ${className}`}
    onClick={onClick}
  >
    <span className='Button_Text'>{label}</span>
  </button>
  )
}

export default ButtonComponent