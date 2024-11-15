

export const toggleExcludeFromGroupActions = (item, contextData) => {
    const {
        itemIsExcludedFromGroupActions,
        excludeFromGroupActionSelection,
        removeFromExcludedActionSelection,
    } = contextData;

    if (!itemIsExcludedFromGroupActions(item)) {
        excludeFromGroupActionSelection(item);
    } else {
        removeFromExcludedActionSelection([item]);
    }
}