

export const selectAllItemsToGroupAction = (contextData) => {
    const {
        selectedToGroupActionsItems,
        itemIsSelectedToGroupActions,
        setSelectedToGroupActionsItems
    } = contextData;

    const {
        getAllRootTreeItems
    } = contextData.fileContext;

    const allRoots = getAllRootTreeItems();
    const newToSelect = allRoots.filter(rootItem => !itemIsSelectedToGroupActions(rootItem));
    
    setSelectedToGroupActionsItems([
        ...selectedToGroupActionsItems,
        ...newToSelect
    ]);
}