

export const isAllFoldersForGroupActionsSelected = (contextData) => {
    const {
        itemIsSelectedToGroupActions
    } = contextData;
    
    const {
        getAllRootTreeItems
    } = contextData.fileContext;

    const allRoots = getAllRootTreeItems();
    let allSelected = true;
    allRoots.forEach(item => {
        if (!itemIsSelectedToGroupActions(item)) {
            allSelected = false;
        }
    })
    return allSelected;
}