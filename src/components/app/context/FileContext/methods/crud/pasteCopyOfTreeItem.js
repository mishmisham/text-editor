

export const pasteCopyOfTreeItem = (copyTreeItem, copyTo, pasteWithReplace=false, contextData) => {
    const {
        tree,
        setTree,
        getCopyOfItem,
        checkForMayCutOrCopyHereHere,
        getRecursiveCopyOfAllChildren,
        removeOldCopyOnPasteReplace,
        renameIfNewNeighboursHasSimilarName,
    } = contextData;

    if (!checkForMayCutOrCopyHereHere(copyTreeItem, copyTo, true)) {
        return false;
    }
    
    let newTree = [...tree];

    try {
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
        
    } catch(err) {
        console.log('pasteCopyOfTreeItem', newTree)
        console.log(err)
    }
    
    return true;
}