

export const splitWrappersToRows = (rows, highlights) => {

    // split wrappers to highlights that wrap every row
    const wrapperHighlights = highlights.filter(highlight=>highlight.isWrapper);

    wrapperHighlights.forEach(highlight => {

        // search rows that wrapped in this highlight
        const wrappedRows = rows.filter(row=>{
            const isFirstRow = row.summary.row === highlight.startsRow;
            const rowEndsInWrap = row.summary.position.start <= highlight.position.end;
            const rowStartsInWrap = row.summary.position.start >= highlight.position.start;
            return !isFirstRow && rowEndsInWrap && rowStartsInWrap;
        });

        wrappedRows.forEach(row => {
            const { summary, letters } = row;
            const highLightRowCopy = JSON.parse(JSON.stringify(highlight));

            const isLastRow = highLightRowCopy.position.end <= summary.position.end;

            // refresh positions on row-part of highlight
            const start = summary.position.start;
            const end = isLastRow ? Math.min(highLightRowCopy.position.end, summary.position.end) : summary.position.end;
            const rowStart = 0;
            const rowEnd = isLastRow ? Math.min(highLightRowCopy.position.rowEnd, letters.length) : letters.length;
            const startSelection = summary.position.startSelection;
            const endSelection = isLastRow ? Math.min(highLightRowCopy.position.endSelection, summary.position.endSelection) : summary.position.endSelection;
            highLightRowCopy.position = {
                start,
                rowStart,
                startSelection,
                end,
                rowEnd,
                endSelection,
            }
            
            // add row numbers to new highlight
            const rowIndex = summary.row;
            highLightRowCopy.startsRow = rowIndex;
            highLightRowCopy.endsRow = rowIndex;

            highlights.push(highLightRowCopy);
        });

        // refresh ends of first row highlight
        const firstRow = rows[highlight.startsRow];
        highlight.endsRow = highlight.startsRow;
        highlight.position.end = firstRow.summary.position.end;
        highlight.position.rowEnd = firstRow.letters.length;
        highlight.position.endSelection = firstRow.summary.position.endSelection;
    });
}