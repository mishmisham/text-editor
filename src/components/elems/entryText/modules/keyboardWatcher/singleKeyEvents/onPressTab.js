import { entryTextConfig } from '../../../config';
import { setCaretPosition } from '../../../components/CaretComponent/utils/contentEditableCaretPosition';

export const onPressTab = (params) => {
    const {
        e,
        focused,
        caret,
        setCaret,
        texts,
        patchTexts,
        currentInput,
        currentInputCursorPosition
    } = params;

    const {
        tabSize
    } = entryTextConfig;

    e.preventDefault();
    e.stopPropagation();
    
    const tmpString = texts[focused].split('');
    texts[focused] = [
        ...tmpString.slice(0, caret),
        ...new Array(tabSize).fill(' '),
        ...tmpString.slice(caret, tmpString.length),
    ].join('');

    patchTexts(texts);

    setTimeout(() => {
        setCaret(caret + tabSize);
    }, 10);
}