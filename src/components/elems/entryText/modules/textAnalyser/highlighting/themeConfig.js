
// в зависимости от выбранного режима 
// ( например вкл/выкл подсветку синтаксиса )
// - выбираются разные группы (например, символов) для подсветки
export const themeConfig = (highlightSettings) => {
    const {
        codeSyntax,
    } = highlightSettings;

    const result = {
        ...highlightSettings,
        symbols: [],
    }

    if (codeSyntax) {
        result.symbols = [
            'operators',
            'array-brackets',
            'object-brackets',
            'function-brackets',
            'quotes',
            'code-divider',
            'object-divider',
        ];
    } else {
        result.symbols = [
            'punctuation',
            'brackets',
            'currency',
            'music',
            'email'
        ];
    }

    return result;
}