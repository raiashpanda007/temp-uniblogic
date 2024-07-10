import React, { forwardRef, useId } from 'react';
import './Input.css';
import { useSelector } from 'react-redux';

const Input = forwardRef(({ label, type = 'text', className = '', placeholder, ...props }, ref) => {  // Spread props correctly
  const id = useId();
  const theme = useSelector(state => state.theme.currtheme);

  return (
    <div className={`Input_Form_Div ${className}`}>
      {label && <label className={`Input_Form_Label`} htmlFor={id}>{label}</label>}
      <input ref={ref} className={`Input_Form_Input_${theme}`} type={type} placeholder={placeholder} id={id} {...props} />
    </div>
  );
});

export default Input;
