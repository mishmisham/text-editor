import React, { forwardRef, useRef } from 'react';
import './InputText.sass';

const InputText = ({
    onInput,
    onChange,
    onKeyUp,
    onKeyDown,
    onFocus,
    onBlur,
    value,
    type,
    name,
    label,
    placeholder,
    disabled,
    addReset
}, ref) => {

    const labelContainer = label ? (<label>{label}</label>) : null;

    const emitInput = (e) => {
        onInput(e.target.value, e, name);
    }

    const reset = (e) => {
        if (!value) {
            return;
        }
        onInput('', e, name);
    }

    return (
        <div className="input-text">
            { labelContainer }
            <div className="input-text_input">
                <input
                    onInput={emitInput}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    onKeyDown={onKeyDown}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    ref={ref}
                    type={type || 'text'}
                    value={value}
                    name={name}
                    placeholder={placeholder || ''}
                    disabled={disabled || false}
                />
                { addReset && value && (
                    <button className="input-text_input-reset" onClick={e=>reset(e)}>⌦</button>
                ) }
            </div>
        </div>
    )
}

export default forwardRef(InputText);