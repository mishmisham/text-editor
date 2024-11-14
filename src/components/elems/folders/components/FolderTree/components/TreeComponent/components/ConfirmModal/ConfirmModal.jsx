import React, { useContext, useRef, forwardRef, useState, useImperativeHandle } from "react";
import useAddEventListener from '@/hooks/useAddEventListener';
import ModalComponent from '@/components/primitive/ModalComponent/ModalComponent.jsx';
import FolderTreeContext from '../../../../context/FolderTreeContext.js';

const ConfirmModal = (_, ref) => {
   
    const resolver = useRef(null);
    const defaultSettings = {
        text: '',
        confirm: true,
        cancel: true,
        confirmText: 'Да',
        cancelText: 'Нет'
    };

    const [settings, setSettings] = useState(defaultSettings);

    const {
        contentRef,
    } = useContext(FolderTreeContext);
    
    const modal = useRef(null);

    const openModal = (upgradeSettings) => {
        setSettings({
            ...settings,
            ...upgradeSettings
        });
        setTimeout(() => {
            modal.current.openModal(true);
        });
    }

    const confirm = () => {
        if (!settings.confirm) {
            return;
        }

        resolver.current({
            userResponse: true,
        });
      
        closeModal();
    }

    const cancel = () => {
        if (!settings.cancel) {
            return;
        }

        resolver.current({
            userResponse: false,
        });
       
        closeModal();
    }

    const closeModal = () => {
        modal.current.openModal(false);
        resolver.current = null;
        setSettings(defaultSettings);
    }

    useImperativeHandle(ref, () => ({
        openModal(upgradeSettings) {
            openModal(upgradeSettings);

            return new Promise((resolve) => {
                resolver.current = (value)=>resolve(value);
            })
        },

        closeModal() {
            closeModal();
        }
    }));

    useAddEventListener(document, 'keydown', e=>{
        if (!modal?.current?.isOpen) {
            return;
        }
        if (e.key === 'Enter') {
            confirm();
        }
        if (e.key === 'Escape') {
            cancel();
        }
    });

    const appendProps = () => {
        if (contentRef && contentRef.current) {
            return {
                appendTo: contentRef.current,
                modeAbsolute: true
            };
        }

        return {
            modeAbsolute: false
        }
    }

    const ContentComponent = () => {
        return (<span>{settings.text}</span>)
    }
    
    const OkComponent = () => {
        return (<button onMouseUp={confirm}>{settings.confirmText}</button>)
    }

    const CancelComponent = () => {
        return (<button onMouseUp={cancel}>{settings.cancelText}</button>)
    }

    return (
        <ModalComponent
            ref={modal}
            customStyle={{
                maxWidth: '240px',
                padding: '8px'
            }}
            {
                ...appendProps()
            }
            BodyComponents={() => {
                return (
                    <div style={{
                        width: '100%',
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>
                        <ContentComponent />
                    </div>
                )
            }}
            FooterComponents={() => {
                return (
                    <>
                        {
                            settings.confirm &&
                            <OkComponent />
                        }
                        {
                            settings.cancel &&
                            <CancelComponent />
                        }
                    </>
                )
            }}
        />
    )
}

export default forwardRef(ConfirmModal);