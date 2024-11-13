

export const removeOldCopyOnPasteReplace = (file, parentID, sourceArray, contextData) => {
    const {
        getFolderCurrentChildren,
        deleteTreeItem
    } = contextData;

    const newParentChildrens = getFolderCurrentChildren(parentID, sourceArray);
    if (!newParentChildrens) {
        return sourceArray;
    }

    try {
        const similarNameItem = newParentChildrens.find(item=>item.name === file.name && item.id !== file.id);
        if (similarNameItem) {
            return deleteTreeItem(similarNameItem.id, null, sourceArray, true);
        }
    } catch(err) {
        console.log('removeOldCopyOnPasteReplace', newParentChildrens)
        console.log(err)
    }
}