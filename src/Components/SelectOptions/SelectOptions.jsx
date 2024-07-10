import React, { forwardRef, useId } from 'react';
import './SelectOptions.css'; // Ensure to import your CSS

function SelectOptions({
    options,
    label,
    theme,
    className,
}, ref) {
    const id = useId();

    return (
        <div className={`SelectOptions ${className} ${theme === 'dark' ? 'dark' : ''}`}>
            <label htmlFor={id}>{label}</label>
            <select ref={ref} id={id} className="custom-select">
                {options && options.map((option, index) => (
                    <option value={option} key={index}>{option}</option>
                ))}
            </select>
        </div>
    );
}

export default forwardRef(SelectOptions);
