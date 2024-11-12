import { autoDetectHighlights } from './autoDetect';
import { highlightCombiner } from './highlightCombiner';
import { themeConfig } from './themeConfig.js';


export const getHighlighting = (rows, highlightSettings, userHighlights) => {

    const settings = themeConfig(highlightSettings);

    // auto detected highlights
    const autoDetectedHighlights = autoDetectHighlights(rows, settings);
    
    // чтобы не перезаписывало оригинал
    const allHighlights = JSON.parse(JSON.stringify([
        ...autoDetectedHighlights,
        ...userHighlights
    ]));
    
    // все highlights, установленные по строкам
    const combinedStructure = highlightCombiner(rows, allHighlights);
        
    return {
        combinedStructure,
        highlights: allHighlights,
    };
}
