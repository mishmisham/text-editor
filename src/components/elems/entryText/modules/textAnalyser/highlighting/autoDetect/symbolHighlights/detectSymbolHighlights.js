import { searchInSymbols } from './utils/searchInSymbols'

export const detectSymbolHighlights = (rows, settings) =>{
    const { symbols } = settings;

    const result = [];
    rows.forEach((row, i) => {
        row.summary.indexes.symbol.forEach(symbolIndex =>{
            const word = row.words[symbolIndex];
            const symbol = searchInSymbols(word, symbols);
            if (symbol) {
                result.push(symbol);
            }
        });
    });
    
    return result;
}