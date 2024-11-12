
export const checkWordType = (wordObject) => {
    const { value } = wordObject;
    
    // eslint-disable-next-line eqeqeq
    if (parseInt(value) == value) {
        wordObject.type = 'number';
    } else if (/^\w+$/.test(value)) {
        wordObject.type = 'word';
    } else if (/\s/.test(value)) {
        wordObject.type = 'space';
    } else if (!value) {
        wordObject.type = 'empty';
    } else {
        wordObject.type = 'symbol';
    }
}