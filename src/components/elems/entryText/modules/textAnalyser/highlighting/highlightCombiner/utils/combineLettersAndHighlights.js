

export const combineLettersAndHighlights = (rows, splittedHighlights) => {
    /*
        // reduce array of rows.row.structure and highlights to array of highlighted rows
    */
    const combinedStructure = [];
 
    rows.forEach((row, rowIndex) => {
        combinedStructure.push([]);
        const rowStructure = row.structure;
        const currentRowHghlights = splittedHighlights.find(highlightList=>highlightList[0].startsRow === row.summary.row);

        for (let i = 0; i <= rowStructure.length; i++) {
            const letter = rowStructure[i];
            if (!currentRowHghlights && letter) {
                combinedStructure[rowIndex].push(letter);
                continue;
            } else if (currentRowHghlights) {
                const currentLetterPositionHighlights = currentRowHghlights.filter(highlightItem=>{
                    return highlightItem.position.rowStart === i;
                });

                const onStart = currentLetterPositionHighlights.filter(highlightItem => highlightItem.isStartPart);
                const onEnd = currentLetterPositionHighlights.filter(highlightItem => highlightItem.isEndPart);
            
                combinedStructure[rowIndex] = [
                    ...combinedStructure[rowIndex],
                    ...onStart.sort((a,b) => a.isWrapper ? -1 : 1),
                    letter,
                    ...onEnd
                ].filter(item=>item);
            }
        }
    });
 
    return combinedStructure;
}