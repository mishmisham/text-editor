
export const getLetterType = (letter) => {
    if (!letter) {
        return 'empty';
    }
    if (/[a-zA-Z]/.test(letter)) {
        return 'letter';
    }
    if (/\s/.test(letter)) {
        return 'space';
    }
    if(/\d/.test(letter)) {
        return 'number';
    }
    
    return 'symbol';
}
