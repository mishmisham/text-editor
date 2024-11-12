import React, { forwardRef, useMemo, useRef } from 'react';
import InputCheckbox from '@/components/primitive/inputs/InputCheckbox/InputCheckbox';
import InputNumber from '@/components/primitive/inputs/InputNumber/InputNumber';
import InputText from '@/components/primitive/inputs/InputText/InputText';
import ModalComponent from '@/components/primitive/ModalComponent/ModalComponent';
import './SettingsModal.sass';
import { optionNames } from './optionNames'
import { optionComponentSettings } from './optionComponentSettings'

const SettingsModal = ({
    componentSettings,
    setComponentSettings
}, ref) => {

    const modal = useRef(null);

    const settingsTemplateList = useMemo(()=>{
        const inputList = Object.keys(componentSettings).map(option => {
            const optionType = typeof componentSettings[option];
            const optionTemplate = {
                key: option,
                value: componentSettings[option],
                label: optionNames.hasOwnProperty(option) ? optionNames[option] : option,
                settingsProps: optionComponentSettings.hasOwnProperty(option) ? optionComponentSettings[option] : {},
            }

            if (optionType === 'boolean') {
                optionTemplate.Component = InputCheckbox;
            }

            if (optionType === 'number') {
                optionTemplate.Component = InputNumber;
            }

            if (optionType === 'string') {
                optionTemplate.Component = InputText;
            }

            return optionTemplate;
        });

        return inputList
                    .sort((a,b)=>a.label[0] > b.label[0] ? 1 : -1);

    }, [componentSettings]);

    const onInput = (value, field) => {
        setComponentSettings(prevState => {return {...prevState, [field]: value}});
    };

    const ContentComponent = () => {
        return (
            settingsTemplateList.map((option, index) => {
                const { Component } = option;
                return (
                    <div key={index} className='settings-modal_content-row'>
                        {
                            <Component
                                onInput={(val)=>onInput(val, option.key)}
                                value={option.value}
                                label={option.label}
                                placeholder={option.label}
                                {
                                    ...option.settingsProps
                                }
                            />
                        }
                    </div>
                )
            })
        )
    }

    return (
        <>
        <ModalComponent
            BodyComponents={ContentComponent}
            // modeAbsolute={true}
            defaultHeader={'Настройки'}
            ref={modal}
        />
        {  
            <button 
                className='settings-modal-button'
                onClick={() => modal.current.openModal(!modal.current.isOpen)}
            >◐</button>
        }
        </>
    )
}

export default forwardRef(SettingsModal);