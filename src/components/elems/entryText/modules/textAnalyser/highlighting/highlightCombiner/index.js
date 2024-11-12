import { findWrappers } from './utils/findWrappers';
import { splitWrappersToRows } from './utils/splitWrappersToRows';
import { prepareHighlightsToRender } from './utils/prepareHighlightsToRender';
import { combineLettersAndHighlights } from './utils/combineLettersAndHighlights';

export const highlightCombiner = (rows, highlights) => {
    
    findWrappers(rows, highlights);
    splitWrappersToRows(rows, highlights);

    const splittedHighlights = prepareHighlightsToRender(rows, highlights);
    const combinedStructure = combineLettersAndHighlights(rows, splittedHighlights);
    
    return combinedStructure;
}