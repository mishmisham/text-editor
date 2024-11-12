import { setCaretPosition } from '../../../components/CaretComponent/utils/contentEditableCaretPosition';

export const onPressBackspace = (params) => {
    const {
        inputListRef,
        focused,
        texts,
        patchTexts,
    } = params;

    const prevIndex = focused - 1;
    const oldTextLength = texts[prevIndex].length;
    texts[prevIndex] += texts[focused];
    texts.splice(focused, 1);
    
    patchTexts(texts);

    setTimeout(() => {
        const prevElem = inputListRef.current[prevIndex].current;
        prevElem.focus();
        setCaretPosition(prevElem, oldTextLength);
    }, 10);
}