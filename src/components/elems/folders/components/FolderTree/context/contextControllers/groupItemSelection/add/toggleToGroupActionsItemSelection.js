
export const toggleToGroupActionsItemSelection = (item, contextData) => {
    const {
        itemIsSelectedToGroupActions,
        removeFromGroupActionsItemSelection,
        addToGroupActionsItemSelection
    } = contextData;
    
    const issetInGroup = itemIsSelectedToGroupActions(item);
    if (issetInGroup) {
        removeFromGroupActionsItemSelection(item);
    } else {
        addToGroupActionsItemSelection(item);
    }
}