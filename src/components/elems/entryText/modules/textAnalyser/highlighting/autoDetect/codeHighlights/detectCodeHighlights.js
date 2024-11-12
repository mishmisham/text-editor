import { searchInKeywords } from './utils/searchInKeywords';
import { searchInSyntaxConstructoins } from './utils/searchInSyntaxConstructoins';

export const detectCodeHighlights = (rows, settings) => {
    const result = [];

    rows.forEach((row, i) => {
        row.summary.indexes.word.forEach(wordIndex =>{
            const word = row.words[wordIndex];

            const keyword = searchInKeywords(word, row);
            if (keyword) {
                result.push(keyword);
            }

            // const syntaxConstruction = searchInSyntaxConstructoins(word, row, rows);
            // if (syntaxConstruction) {
            //     result.push(syntaxConstruction);
            // }

        });
    });

    return result;
}