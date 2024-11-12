import { checkWordType } from './checkWordType';
import { symbolInformaiton } from '../symbolInformation/index.js';

export const parseWords = (rowObject) => {
    
    const withoutSymbols = rowObject.value.replace(/\W|_/g, '- -');
    const arrayWithoutSymbols = rowObject.value.length ? withoutSymbols.split('-').filter(item=>item) : [''];

    let rowIndex = 0;

    const parsedWords = arrayWithoutSymbols.map((word, i) => {
        
        const rowStartPosition = rowIndex;

        const wordValue = word !== ' ' ? word : rowObject.value[rowStartPosition];

        const startPosition = rowObject.position.start + rowIndex;
        const endPosition = startPosition + wordValue.length;
        const startSelectionPosition = rowObject.position.startSelection + rowIndex;
        const endSelectionPosition = startSelectionPosition + wordValue.length;
        
        rowIndex += wordValue.length;

        const wordInfo = {
            value: wordValue, // слово
            index: i, // индекс в этом массиве (words) - нужно для оптимизации
            position: {
                // индекс начала слова в строке
                // также это ключ для type===symbol в массиве structure
                rowStart: rowStartPosition, 
                rowEnd: rowIndex, //индекс конца слова в строке
                start: startPosition, // индекс начала слова в тексте
                end: endPosition, // индекс конца слова в тексте
                startSelection: startSelectionPosition, // индекс начала слова в html selection
                endSelection: endSelectionPosition, // индекс конца слова в html selection
            },
            type: '' // word|number|space|symbol
        }

        // wordInfo.type = word|number|space|symbol
        checkWordType(wordInfo);

        // доп информация о знаках пунктуации/операторах - для подсветки
        if (wordInfo.type === 'symbol' && symbolInformaiton.hasOwnProperty(wordValue)) {
            wordInfo.info = symbolInformaiton[wordValue];
        }

        // для оптимизации скорости обхода слов в циклах
        rowObject.indexes[wordInfo.type].push(i);
        
    
        return wordInfo;
    });

    return parsedWords;
}