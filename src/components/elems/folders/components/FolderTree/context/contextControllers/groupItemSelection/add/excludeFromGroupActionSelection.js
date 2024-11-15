

export const excludeFromGroupActionSelection = (item, contextData) => {
    const {
        excludedFromGroupActionsItems,
        itemIsSelectedToGroupActions,
        removeFromGroupActionsItemSelection,
        removeChildrenFromGroupActionsSelection,
        setExcludedFromGroupActionsItems
    } = contextData;
    
    if (itemIsSelectedToGroupActions(item)) {
        removeFromGroupActionsItemSelection(item);
    }

    removeChildrenFromGroupActionsSelection(item);

    setExcludedFromGroupActionsItems([
        ...excludedFromGroupActionsItems,
        item
    ]);
}