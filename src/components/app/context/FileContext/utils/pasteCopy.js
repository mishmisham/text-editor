

export const pasteCopy = (copyTreeItem, copyTo, pasteWithReplace=false, contextData) => {
    const {
        tree,
        setTree,
        getCopyOfItem,
        checkForMayCutOrCopyHere,
        getRecursiveCopyOfAllChildren,
        removeOldCopyOnPasteReplace,
        renameIfNewNeighboursHasSimilarName,
    } = contextData;

    if (!checkForMayCutOrCopyHere(copyTreeItem, copyTo, true)) {
        return false;
    }
    
    let newTree = [...tree];
    const newItem = getCopyOfItem(copyTreeItem, copyTo.id);
    newTree.push(newItem);

    if (copyTreeItem.type === 'folder') {
        const newItemCopyList = getRecursiveCopyOfAllChildren(copyTreeItem.id, newItem.id, [...newTree]);
        newTree = [
            ...newTree,
            ...newItemCopyList
        ];
    }

    if (pasteWithReplace) {
        newTree = removeOldCopyOnPasteReplace(newItem, copyTo.id, newTree);
    } else {
        renameIfNewNeighboursHasSimilarName(newItem, copyTo.id, newTree);
    }
    
    setTree(newTree);
    return true;
}