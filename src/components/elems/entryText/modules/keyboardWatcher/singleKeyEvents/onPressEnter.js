import { entryTextConfig } from '../../../config';
import { setCaretPosition } from '../../../components/CaretComponent/utils/contentEditableCaretPosition';

export const onPressEnter = (params) => {
    const {
        e,  // original event
        inputListRef, // input list refs
        caretMethods,  // caret handlers
        texts,  // text values list
        patchTexts, // update texts method
        pushedKeys,  // array of currently pressed keys
        itsKeyCombination, // boolean value - is pressed more than 1 key
        textInformation,  // analysed arrays of text, splitted by letters, words, rows and with installed highlight markup
        highlightedTexts, // all rendered in input html
        componentSettings, // component settings
    } = params;

    const {
        textAsArray
    } = textInformation;

    const {
        saveSpacesOnNewString
    } = componentSettings;

    const caretInfo = caretMethods('getCaretInfo');

    console.log('caretInfo', caretInfo)

    const {
        currentRowNumber,
        isSingleRowMode,
        caret
    } = caretInfo;

    if (isSingleRowMode) {
        e.preventDefault();
    } else {
        return;
    }
    

    const nextIndex = currentRowNumber + 1;

    const currentValue = textAsArray[currentRowNumber]
                                        .replace(/\n/g, '')
                                        .replace(/\r/g, '')
                                        .replace(/\s/g, ' ');


    console.log('currentValue', currentValue, caret, currentValue.length, currentValue.slice(caret, currentValue.length))
    


    const newStringCleanValue = currentValue.slice(caret, currentValue.length);
    textAsArray[currentRowNumber] = currentValue.slice(0, caret);
    console.log('newStringCleanValue', newStringCleanValue)

    // if need save tab spaces on new string
    // saveSpacesOnNewString === true
    let newCursorPosition = 0;
    if (saveSpacesOnNewString) {
        const splittedString = currentValue.split(' ');
        for (let i = 0; i < splittedString.length-1; i+=1) {
            if (!splittedString[i]) {
                newCursorPosition += 1;
            } else {
                break;
            }
        }
    }

    const preSpace = newCursorPosition > 0 ? new Array(newCursorPosition).fill(' ').join('') : '';
    const newStringValue = preSpace + '' + newStringCleanValue;

    textAsArray.splice(nextIndex, 0, newStringValue);

    console.log(textAsArray)

    patchTexts(textAsArray.join('\n'));

    setTimeout(() => {
        // caretMethods('setCaret', newCursorPosition);
    }, 100);
}