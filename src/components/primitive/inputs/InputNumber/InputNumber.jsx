import React, { forwardRef, useMemo } from 'react';
import './InputNumber.sass';

const InputNumber = ({
    onInput,
    onChange,
    onKeyUp,
    onKeyDown,
    onFocus,
    onBlur,
    value,
    name,
    label,
    placeholder,
    disabled,
}, ref) => {

    const labelContainer = label ? (<label>{label}</label>) : null;
    
    const emitInput = (e) => {
        onInput(parseFloat(e.target.value), e, name);
    }

    return (
        <div className="input-number">
            { labelContainer }
            <input
                onInput={emitInput}
                onChange={onChange}
                onKeyUp={onKeyUp}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
                ref={ref}
                type='text'
                value={value}
                name={name}
                placeholder={placeholder || ''}
                disabled={disabled || false}
            />
        </div>
    )
}

export default forwardRef(InputNumber);