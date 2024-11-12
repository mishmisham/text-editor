import React, { forwardRef } from 'react';
import './InputCheckbox.sass';

const InputCheckbox = ({
    value,
    name,
    label,
    onInput
}, ref) => {

    const onChange = (value, e) => {
        onInput(value, e, name);
    }

    const checkboxClassName = value ? 'input-checkbox input-checkbox--checked' : 'input-checkbox';
    
    return (
        <div className={checkboxClassName}>
            <span
                onClick={e=>onChange(!value, e)}
                className="input-checkbox_input">
                <input
                    onChange={e=>onChange(e.target.checked, e)}
                    checked={value}
                    name={name}
                    type="checkbox"
                />
            </span>

            <span className="input-checkbox_label">
                {label}
            </span>
        </div>
    )
}

export default forwardRef(InputCheckbox);