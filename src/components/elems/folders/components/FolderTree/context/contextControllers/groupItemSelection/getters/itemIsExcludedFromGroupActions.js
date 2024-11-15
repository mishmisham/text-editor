
export const itemIsExcludedFromGroupActions = (item, deepCheck=false, contextData) => {
    const { excludedFromGroupActionsItems } = contextData;
    const issetItem = excludedFromGroupActionsItems.find(elem=>elem.id === item.id);

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
        if (excludedFromGroupActionsItems.find(elem=>elem.id === parent.id)) {
            isSelected = parent;
        }
    });

    return isSelected;
}