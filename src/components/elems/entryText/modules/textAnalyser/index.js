import { getRowsInfo } from './rowInformation';
import { getHighlighting } from './highlighting';

export const textAnalyser = (text, highlightSettings, userHighlights) => {

    // позиции знаков и строк, простые типы
    const {
        rows,
        textAsArray
    } = getRowsInfo(text);
    // форматированный массив позиций подсветки и стилизации 
    const { 
        highlights,
        combinedStructure
     } = getHighlighting(rows, highlightSettings, userHighlights);

    const result = {
        rows, 
        highlights,
        combinedStructure,
        textAsArray
    };

    return result;
}