
export const itemIsSelectedToGroupActions = (item, deepCheck=false, contextData) => {
    const { selectedToGroupActionsItems } = contextData;
    
    const issetItem = selectedToGroupActionsItems.find(elem=>elem.id === item.id);
    if (!deepCheck || issetItem) {
        return issetItem;
    }

    const {
        tree,
        getTreeItemPath
    } = contextData.fileContext
    
    let isSelected = undefined;
    const itemFullPath = getTreeItemPath(item, tree);
    itemFullPath.forEach(parent => {
        if (selectedToGroupActionsItems.find(elem=>elem.id === parent.id)) {
            isSelected = parent;
        }
    });

    return isSelected;
}