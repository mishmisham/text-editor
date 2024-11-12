import { parseLetters } from './letters';
import { bindLettersAndWords } from './letters/utils/bindLetterAndWords'
import { parseWords } from './words'

export const getRowsInfo = (text) => {

    let positionCounter = 0;
    let selectionPosition = 0;

    const textAsArray = text
                    .replace(/\r/g, /\n/)
                    .split(/\n/);
            
    const rows = textAsArray.map((row, i) => {

        // row information
        const summary = {
            row: i,
            value: row,
            displayRowNumber: i+1,
            position: {
                // позиции с учетом символа переноса строки
                start: positionCounter,
                end: positionCounter + row.length,
                // позиции без учета \n - как считает selection в браузере
                startSelection: selectionPosition,
                endSelection: selectionPosition + row.length,
            },
            indexes: {
                // индексы type===word в массиве words
                word: [],
                // индексы type===number в words
                number: [],
                // индексы type===symbol в words
                symbol: [],
                // индексы type===space в words
                space: [],
                // индексы type===empty в words
                empty: [],
            }
        };

        // just array of letters
        let letters = summary.value.split('');
        if (!letters.length) {
            letters = [''];
        }
        // parse every symbol
        const structure = parseLetters(summary, letters);
        // parse info about words and symbols
        const words = parseWords(summary);

        // connect letters and words
        bindLettersAndWords(structure, words);


        // +1 === \n
        positionCounter += row.length + 1;
        selectionPosition += row.length;

        return {
            summary,
            structure,
            letters,
            words
        };
    });

    return {
        rows,
        textAsArray
    }
}