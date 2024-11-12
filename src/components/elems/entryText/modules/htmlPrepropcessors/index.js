
export const textPrepropcessors = (textInformation) => {
    const {
        // rows,
        // highlights,
        combinedStructure
    } = textInformation;

    let html = '';

    const addStartHighlight = (item) => {
        html += `<span class="${item.className}" style="${item.styles}">`;
    }

    const addEndHighlight = (item) => {
        html += `</span>`;
    }

    const addLetter = (item, i) => {

        let value = '';
        const { position } = item;
        const { rowStart, startSelection, start } = position;
        const letterInfo = ` data-row="${i}" data-row-position="${rowStart}" data-select-position="${startSelection}" data-position="${start}" `;
        if ( item.type === 'space' ) {
            value = `<span class="space" ${letterInfo}>&#160;</span>`;
        } else if (item.type === 'empty') {
            value = `<span class="empty" ${letterInfo}></span>`;
        } else {
            value = `<span class="${item.type}" ${letterInfo}>${item.value}</span>`;
        }

        if (item.isStartOfWord) {
            html += `<span class="word" data-word-index="${item.wordStartAt}">`;
        }

        html += value;

        if (item.isEndOfWord) {
            html += '</span>';
        }
    }

    let lastItemPos = {
        "rowStart": 0,
        "start": 0,
        "startSelection": 0,
    };

    combinedStructure.forEach((row, i) => {
        html += `<div class="row" data-container-row="${i}"><span data-inner-row="${i}" class="row-inner">`;

        let isEmptyRow = false;
      
        row.forEach(item => {
            if (item.isHighlight && item.isStartPart) {
                addStartHighlight(item);
            }
            if (!item.isHighlight) {

                addLetter(item, i);

                lastItemPos = {...item.position};

                if (item.type === 'empty') {
                    isEmptyRow = true;
                }

            }
            if (item.isHighlight && item.isEndPart) {
                addEndHighlight(item);
            }
        });

        lastItemPos.start++;
        lastItemPos.rowStart++;
        const brSpanInfo = ` data-row="${i}" data-row-position="${lastItemPos.rowStart}" data-select-position="${lastItemPos.startSelection}" data-position="${lastItemPos.start}" `;
        const brSpan = isEmptyRow ? '' : `<span class="fake-br" ${brSpanInfo}></span>`;

        const postfix = i === combinedStructure.length - 1 ? '' : '<span class="real-br">\n</span>';

        html += brSpan+'</span></div>'+postfix+'';
    })

    return html;
}