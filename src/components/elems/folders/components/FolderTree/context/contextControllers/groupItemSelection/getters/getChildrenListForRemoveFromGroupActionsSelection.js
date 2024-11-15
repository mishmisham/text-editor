

export const getChildrenListForRemoveFromGroupActionsSelection = (item, contextData) => {
    if (item.type !== 'folder') {
        return [];
    }

    const {
        itemIsSelectedToGroupActions
    } = contextData;
    
    const {
        getAllFolderChildren,
        tree,
    } = contextData.fileContext;

    const itemChildren = getAllFolderChildren(item.id, tree).map(child=>child.item);
    const removeFromGroupList = itemChildren.filter(child=>itemIsSelectedToGroupActions(child));
    return removeFromGroupList;
}