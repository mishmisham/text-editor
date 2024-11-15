

export const removeFromGroupActionsItemSelection = (item, contextData) => {
    const { 
        selectedToGroupActionsItems,
        getExcludedFromGroupActionsChildren,
        removeFromExcludedActionSelection,
        setSelectedToGroupActionsItems
    } = contextData;
    const excludedChildren = getExcludedFromGroupActionsChildren(item);

    removeFromExcludedActionSelection(excludedChildren);

    setSelectedToGroupActionsItems([
        ...selectedToGroupActionsItems
                .filter(elem=>elem.id !== item.id),
    ]);
}