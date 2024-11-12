

export const renameIfNewNeighbourHasSimilarName = (item, parentID, sourceArray, contextData) => {
    
    const {
        findFolderCurrentChildren
    } = contextData;
    
    const newParentChildrens = findFolderCurrentChildren(parentID, sourceArray);
    if (!newParentChildrens) {
        return;
    }

    const similarNameItem = newParentChildrens.find(child=>child.name === item.name && child.id !== item.id);
    if (similarNameItem) {
        item.name = similarNameItem.name + ' copy';
    }
}