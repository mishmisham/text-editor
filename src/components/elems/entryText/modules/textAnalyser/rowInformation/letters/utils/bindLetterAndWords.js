
export const bindLettersAndWords = (structure, words) => {
    words.forEach(word => {
        const { rowStart, rowEnd } = word.position;

        if (word.type === 'word' || word.type === 'number') {
            
            for (let i = rowStart; i < rowEnd; i++) {
                const letter = structure[i];

                letter.isPartOf = word;

                if (i === rowStart) {
                    letter.isStartOfWord = true;
                }

                if (i === rowEnd - 1) {
                    letter.isEndOfWord = true;
                }

                letter.wordStartAt = rowStart;
            }
        }
    })
}