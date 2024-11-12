import React, { forwardRef, useRef, useEffect, useMemo, useState } from 'react';
import './InputTexteditorComponent.sass';

const InputTexteditorComponent = ({
    highlightedTexts,
    patchTexts,
    inputListRef,
    caretMethods,
    textInformation,
    leftAsideMethods,
}, ref) => {

    const [mouseIsPressed, setMouseIsPressed] = useState(false) 
    
    let timeout = null;
    const debouncedBackupCaret = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            caretMethods('backupCaretPosition');
        }, 12);
    }
    
    const onInput = async (e) => {
        caretMethods('backupCaretPosition');
        patchTexts(inputListRef.current.textContent);
    }

    const onMouseMove = (e) => {
        if (!mouseIsPressed) {
            return;
        }
        debouncedBackupCaret();
    }

    const onKeyUp = (e) => {
        debouncedBackupCaret();
    }

    const onMouseDown = (e) => {
        setMouseIsPressed(true);
    }

    const onMouseUp = (e) => {
        debouncedBackupCaret();
        setMouseIsPressed(false);
    }

    const preprocessedTexts = useMemo(() => {
        if (!highlightedTexts) {
            return '';
        }

        setTimeout(() => {
            caretMethods('restoreCaret');
            leftAsideMethods('refreshRowNumbers');
        }, 1);

        return  highlightedTexts;
    }, [highlightedTexts, caretMethods]);

    return (
        <>
            <div
                contentEditable
                onInput={onInput}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onTouchEnd={onMouseUp}
                onMouseMove={onMouseMove}
                onKeyUp={onKeyUp}
                className='entry-text_input'
                ref={inputListRef}
                dangerouslySetInnerHTML={{__html: preprocessedTexts}}
            ></div>
        </>
    )
}

export default forwardRef(InputTexteditorComponent);