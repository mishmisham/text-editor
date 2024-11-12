import { detectCodeHighlights } from './codeHighlights/detectCodeHighlights.js';
import { detectSymbolHighlights } from './symbolHighlights/detectSymbolHighlights.js';

export const autoDetectHighlights = (rows, settings) => {

    let result = [];
    
    if (settings.codeSyntax) {
        const keywords = detectCodeHighlights(rows, settings);
        result = [
            ...result,
            ...keywords
        ];
    }

    if (!settings.disableSymbolHighlight) {
        const symbols = detectSymbolHighlights(rows, settings);
        result = [
            ...result,
            ...symbols
        ];
    }

    return result;
}