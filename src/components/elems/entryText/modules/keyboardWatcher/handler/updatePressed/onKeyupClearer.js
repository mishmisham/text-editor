
export const onKeyupClearer = ({
    e,
    pushedKeys,
    setPushedKeys
}) => {
    if (typeof e === 'string') {
        return;
    }

    setPushedKeys([
        ...pushedKeys.filter(key => key.toLowerCase() !== e.key.toLowerCase())
    ]);
}
