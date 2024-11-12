import React, { forwardRef, useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';
import './ModalComponent.sass';

const ModalComponent = ({
    HeaderComponents,
    BodyComponents,
    FooterComponents,
    modeAbsolute,
    defaultHeader,
    customStyle,
    appendTo,
}, ref) => {

    const [displayModal, setDisplayModal] = useState(false);
    
    useImperativeHandle(ref, () => ({
        openModal(value) {
            setDisplayModal(value);
        },

        isOpen: displayModal
    }));

    const modalClass = modeAbsolute ? 'modal modal--absolute' : 'modal';

    const modalCustomStyles = customStyle ? {...customStyle} : {};
   

    const ModalTemplate = () => {
        return ( displayModal && 
            <div className={modalClass}>
                <div
                    className='modal_inner'
                    style={modalCustomStyles}
                >
                    {
                        defaultHeader !== undefined &&
                        <div className='modal_inner-header-default'>
                            {
                                defaultHeader.length &&
                                <span className='modal_inner-header-default-title'>
                                    { defaultHeader }
                                </span>
                            }
                            <button
                                onClick={e=>setDisplayModal(false)}
                                className='modal_inner-header-default-close'
                            >✕</button>
                        </div>
                    }
                    { HeaderComponents &&
                        <div className='modal_inner-header'>
                            <HeaderComponents />
                        </div>
                    }
                    { BodyComponents &&
                        <div className='modal_inner-scrollable'>
                            <div className='modal_content'>
                                <BodyComponents />
                            </div>
                        </div>
                    }
                    { FooterComponents &&
                        <div className='modal_inner-footer'>
                            <FooterComponents />
                        </div>
                    }
                </div>
            </div>
        )
    }
    return (
        <>
        {modeAbsolute && !appendTo && <ModalTemplate />}
        {!modeAbsolute && !appendTo && ReactDOM.createPortal(<ModalTemplate />, document.body)}
        {appendTo && modeAbsolute && ReactDOM.createPortal(<ModalTemplate />, appendTo)}
        </>
    )
}

export default forwardRef(ModalComponent);