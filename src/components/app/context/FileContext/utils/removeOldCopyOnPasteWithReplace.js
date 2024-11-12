

export const removeOldCopyOnPasteWithReplace = (file, parentID, sourceArray, contextData) => {
    const {
        findFolderCurrentChildren,
        deleteTreeItem
    } = contextData;

    const newParentChildrens = findFolderCurrentChildren(parentID, sourceArray);
    if (!newParentChildrens) {
        return sourceArray;
    }
    
    const similarNameItem = newParentChildrens.find(item=>item.name === file.name && item.id !== file.id);
    if (similarNameItem) {
        return deleteTreeItem(similarNameItem.id, null, sourceArray, true);
    }
}