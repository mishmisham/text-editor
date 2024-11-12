
// find highlights, that used in >1 rows (wrappers)
// add row numbers to every highlights item

export const findWrappers = (rows, highlights) => {
    rows.forEach(row => {
        const { start, end } = row.summary.position;
        const rowIndex = row.summary.row;

        const startsOnRowHighlights = highlights.filter(highlight => {
            const { position } = highlight;
            return position.start >= start && position.start <= end;
        });

        // set start row index for every highlight
        startsOnRowHighlights.forEach(highlight => {
            highlight.startsRow = rowIndex;
            if (highlight.position.end <= end) {
                highlight.endsRow = rowIndex;
                highlight.isWrapper = false;
            } else {
                // find wrappers, mark wrappers
                highlight.isWrapper = true;
            }
        });
    });
}