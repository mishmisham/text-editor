

export const pasteCopyOfTreeItem = (copyTreeItem, copyTo, pasteWithReplace=false, contextData) => {
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
    
    let newTree = [...JSON.parse(JSON.stringify(tree))];

    const newItem = getCopyOfItem(copyTreeItem, copyTo.id);

    try {
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
    
    return newItem;
}