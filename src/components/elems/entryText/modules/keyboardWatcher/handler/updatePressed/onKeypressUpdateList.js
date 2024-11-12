
export const onKeypressUpdateList = ({
    e,
    pushedKeys,
    setPushedKeys
}) => {
    const currentPushed = [
        ...new Set([
            ...pushedKeys,
            e.key
        ])
    ];

    setPushedKeys([ ...currentPushed ]);

    const itsKeyCombination = pushedKeys.length > 1;

    return {
        currentPushed,
        itsKeyCombination
    } 
}