import React, { useState, useRef, useMemo } from "react";
import './EntryTextComponent.sass'
import InputTexteditorComponent from './components/InputTexteditorComponent/InputTexteditorComponent';
import CaretComponent from './components/CaretComponent/CaretComponent';
import LeftAsideComponent from './components/LeftAsideComponent/LeftAsideComponent';
import SettingsModal from './components/SettingsModal/SettingsModal';
import { keyboardHandler, onKeyupClearer } from './modules/keyboardWatcher';
import { textPrepropcessors } from './modules/htmlPrepropcessors';
import { textAnalyser } from './modules/textAnalyser'
import useWatch from '@/hooks/useWatch';
import { entryTextConfig } from './config';

import MouseWatcher from './modules/MouseWatcher';

const EntryTextComponent = ({
    texts, // текст
    textUpgrades, // пользовательские "украшательства" - жирный/курсив/комментарии и тд
    onInput,
    onTextUpgrade
}) => {

    // enable syntax highlighting
    const [componentSettings, setComponentSettings] = useState({
        ...entryTextConfig
    });

    const mainView = useRef(null)
    // ref to main text input
    const inputListRef = useRef(null);
    // mouse coordinates watcher component ref
    const mouseHandler = useRef(null);
    // caret selection component
    const caretRef = useRef(null);
    // left aside container selection component
    const leftAsideRef = useRef(null);
   
    const caretMethods = (method, args) => {
        if (!caretRef.current) {
            return;
        }
        return caretRef.current[method](args);
    }

    const leftAsideMethods = (method, args) => {
        if (!leftAsideRef.current) {
            return;
        }
        return leftAsideRef.current[method](args);
    }

    const mouseMethods = (method, args) => {
        if (!mouseHandler.current) {
            return;
        }
        mouseHandler.current[method](args);
    }

    // parsed and analysed text
    const textInformation = useMemo(()=>textAnalyser(texts, componentSettings, textUpgrades.highlights), [texts, componentSettings, textUpgrades.highlights]);
    // highlighted html
    const highlightedTexts = useMemo(() => textPrepropcessors(textInformation), [textInformation]);
    
    // array of pressed keys
    const [pushedKeys, setPushedKeys] = useState([]);
    
    const patchTexts = (newText) => {
        onInput(newText);
    }

    const patchTextUpgrade = (upgrades) => {
        onTextUpgrade(upgrades);
    }

    const onKeyDown = (e) => {
        keyboardHandler({
            e,
            inputListRef,
            caretMethods,
            texts,
            patchTexts,
            pushedKeys,
            setPushedKeys,
            textInformation,
            highlightedTexts,
            componentSettings
        });
    }

    const onKeyUp = (e) => {
        onKeyupClearer({
            e,
            pushedKeys,
            setPushedKeys,
        });
    }

    const onMouseDown = (e) => {
        // mouseMethods('setMouseIsDown', true)
        // mouseMethods('setClickCoordinates', e)
    }

    const onMouseUp = (e) => {
        // mouseMethods('setMouseIsDown', false)
    }

    const [codeMargin, setCodeMargin] = useState(0);

    useWatch(() => {
        setCodeMargin(leftAsideRef.current ? leftAsideRef.current.aside.clientWidth + 'px' : 0)
    }, [leftAsideRef, componentSettings])
   
    const setAsideLeftMarginOnScroll = () => {
        if (mainView.current && leftAsideRef.current){
            leftAsideRef.current.aside.style.left = (mainView.current.scrollLeft - 1) + 'px';
        }
    }

    const onScroll = (e) => {
        setAsideLeftMarginOnScroll();
    }

    return (
        <div className="entry-text_wrapper">

            <MouseWatcher ref={mouseHandler} />

            <div
                className="entry-text"
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                // onMouseDown={onMouseDown}
                // onMouseUp={onMouseUp}
                onScroll={onScroll}
                ref={mainView}
            >
                <div
                    className="entry-text_inner"
                    style={{
                        marginLeft: codeMargin
                    }}
                >
                    <div className="entry-text_inner-content">
                        <CaretComponent
                            ref={caretRef}
                            {
                                ...{
                                    textInformation,
                                    inputListRef,
                                    leftAsideMethods,
                                }
                            }
                        />
                        <InputTexteditorComponent
                            { 
                                ...{
                                    textInformation,
                                    highlightedTexts,
                                    inputListRef,
                                    patchTexts,
                                    caretMethods,
                                    leftAsideMethods,
                                }
                            }
                        />
                    </div>
                </div>
                {
                    componentSettings.displayRowNumbers &&
                        <LeftAsideComponent
                            {
                                ...{
                                    inputListRef,
                                    textInformation,
                                }
                            }
                            ref={leftAsideRef}
                        />
                }
            </div>
            {
                <SettingsModal
                    {
                        ...{
                            componentSettings,
                            setComponentSettings
                        }
                    }
                />
            }
        </div>
    )
}

export default EntryTextComponent;