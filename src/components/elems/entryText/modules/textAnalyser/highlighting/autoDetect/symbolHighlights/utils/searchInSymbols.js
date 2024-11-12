import { symbolGroupStyles } from '../colors/symbolColors'

export const searchInSymbols = (symbol, symbols) => {
    if (!symbol.hasOwnProperty('info')) {
        return null;
    }

    const { groups } = symbol.info;

    let currentGroup = null;

    for(let i=0; i<symbols.length; i++) {
        if (groups.indexOf(symbols[i]) !== -1) {
            currentGroup = symbols[i];
            break;
        }
    }

    if (!currentGroup) {
        return null;
    }

    const groupSettings = symbolGroupStyles[currentGroup];
    const otherStyles = groupSettings.hasOwnProperty('styles') ? groupSettings.styles.join('') : '';
    const styles = `color: ${groupSettings.color};${otherStyles}`;

    return {
        type: 'symbol',
        styles,
        className: groupSettings.hasOwnProperty('classNames') ? groupSettings.classNames.join(' ') : '',
        position: { ...symbol.position },
    }

}