import { onPressEnter } from "./onPressEnter";
import { onPressBackspace } from "./onPressBackspace";
import { onPressTab } from "./onPressTab";

export const singleKeyEvents = (params) => {

    const {
        e,  // original event
        inputListRef, // input list refs
        caretMethods,  // caret handlers
        texts,  // text values list
        patchTexts, // update texts method
        pushedKeys,  // array of currently pressed keys
        itsKeyCombination, // boolean value - is pressed more than 1 key
        textInformation,  // analysed arrays of text, splitted by letters, words, rows and with installed highlight markup
        highlightedTexts, // all rendered  in input html
        componentSettings // component settings
    } = params;

    // enter
    if (e.key === 'Enter') {
        onPressEnter(params);
    }

    // // backSpace to previous string
    // if (e.key === 'Backspace' && focused > 0 && currentInputCursorPosition === 0) {
    //     onPressBackspace(params);
    // }

    // // tab
    // if (e.key === 'Tab') {
    //     onPressTab(params);
    // }
}