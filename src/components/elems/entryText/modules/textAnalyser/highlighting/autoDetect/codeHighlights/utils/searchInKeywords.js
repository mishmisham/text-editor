import { jsWords } from '../colors/jsWords';

const dictionaries = [
    ...jsWords,
];

const hasBansForKeywords = (word, row, colorGroup) => {

    const { index } = word;

    const previousSibling = row[index - 1];
    const nextSibling = row[index + 1];
    
    /*
        TODO добавить массивы included | excluded символов
             в каждый объект в jsWords
             и тут проверять предыдущий и следующий элемент строки
    */
    return false;
}

export const searchInKeywords = (word, row) => {

    let result = null;

    for (let i=0; i<dictionaries.length; i++) {
        const colorGroup = dictionaries[i];
        const { words } = colorGroup;
        const issetWord = words.find(option=>option === word.value);
        
        // if (hasBansForKeywords(word, row, colorGroup)) {
        //     break;
        // }

        if ( issetWord ) {
            const otherStyles = colorGroup.hasOwnProperty('otherStyles') ? colorGroup.otherStyles.join('') : '';
            const styles = `color: ${colorGroup.color};${otherStyles}`;

            result = {
                type: 'keyword',
                styles,
                className: colorGroup.hasOwnProperty('classNames') ? colorGroup.classNames.join(' ') : '',
                position: { ...word.position },
            }

            break;
        }
    }

    return result;
}