

export const renameIfNewNeighboursHasSimilarName = (item, parentID, sourceArray, contextData) => {
    
    const {
        getFolderCurrentChildren
    } = contextData;
    
    const newParentChildrens = getFolderCurrentChildren(parentID, sourceArray);
    if (!newParentChildrens) {
        return;
    }

    const similarNameItem = newParentChildrens.find(child=>child.name === item.name && child.id !== item.id);
    if (similarNameItem) {
        item.name = similarNameItem.name + ' copy';
    }
}