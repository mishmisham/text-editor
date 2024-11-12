import { singleKeyEvents } from '../singleKeyEvents';
import { multiKeyEvents } from '../multiKeyEvents';
import { onKeypressUpdateList } from './updatePressed/onKeypressUpdateList'

export const keyboardHandler = ({
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
}) => {
    if (typeof e === 'string') {
        return;
    }

    const {
        currentPushed,
        itsKeyCombination
    } = onKeypressUpdateList({
        e,
        pushedKeys,
        setPushedKeys
    });

    const params = {
        e,  // original event
        inputListRef, // input list refs
        caretMethods,  // caret handlers
        texts,  // text values list
        patchTexts, // update texts method
        pushedKeys: currentPushed,  // array of currently pressed keys
        itsKeyCombination, // boolean value - is pressed more than 1 key
        textInformation,  // analysed arrays of text, splitted by letters, words, rows and with installed highlight markup
        highlightedTexts, // all rendered  in input html
        componentSettings // component settings
    }

    // console.log(currentPushed, itsKeyCombination)

    if (itsKeyCombination) {
        multiKeyEvents(params);
    } else {
        singleKeyEvents(params);
    }
}