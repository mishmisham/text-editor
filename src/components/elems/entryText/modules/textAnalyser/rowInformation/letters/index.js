import { getLetterType } from './utils/getLetterType.js'

export const parseLetters = (rowSummary, letters) => {

    const structure = letters.map((letter, i) => {
        const result = {
            value: letter,
            position: {
                // позиция с учетом \n
                start: rowSummary.position.start + i,
                // позиции без учета \n - как считает selection в браузере
                startSelection: rowSummary.position.startSelection + i,
                // позиция в строке
                rowStart: i
            },
            type: getLetterType(letter)
        };

        return result;
    })

    return structure
}