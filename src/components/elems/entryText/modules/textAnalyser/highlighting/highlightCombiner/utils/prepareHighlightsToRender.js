

export const prepareHighlightsToRender = (rows, highlights) => {
    // split every highlight to 'start-part' & 'end-part'
    const splittedHighlights = highlights
        .sort((a,b)=>a.startsRow > b.startsRow ? 1 : -1)
        .reduce((acc, cur) => {
            cur.isHighlight = true;
            const onStart = JSON.parse(JSON.stringify(cur));
            onStart.isStartPart = true;
            const onEnd = JSON.parse(JSON.stringify(cur));
            onEnd.isEndPart = true;
            onEnd.position.start = cur.position.end;
            onEnd.position.rowStart = cur.position.rowEnd - 1;
            onEnd.position.startSelection = cur.position.endSelection;
            
            if (acc.length && acc[acc.length - 1][0].startsRow === cur.startsRow) {
                acc[acc.length - 1] = [
                    ...acc[acc.length - 1],
                    onStart,
                    onEnd
                // sort by min position.start field
                ].sort((a,b)=>a.position.start > b.position.start ? 1 : -1);

                return acc;
            } else {
                return [
                    ...acc,
                    [
                        onStart,
                        onEnd
                    ]
                ]
            }
    }, []);

    return splittedHighlights;
}