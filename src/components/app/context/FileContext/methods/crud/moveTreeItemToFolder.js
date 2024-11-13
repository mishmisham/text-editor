

export const moveTreeItemToFolder = (moveTreeItem, moveTo, pasteWithReplace, contextData) => {
    const {
        tree,
        setTree,
        checkForMayCutOrCopyHereHere,
        getClosestTreeItemFolder,
        removeOldCopyOnPasteReplace,
        renameIfNewNeighboursHasSimilarName,
    } = contextData;

    if (!checkForMayCutOrCopyHereHere(moveTreeItem, moveTo)) {
        return false;
    }

    let newTree = [...tree];
    const parentID = getClosestTreeItemFolder(moveTo);
    try {
        const index = tree.findIndex(item=>item.id === moveTreeItem.id);

        if (pasteWithReplace) {
            newTree = removeOldCopyOnPasteReplace(moveTreeItem.name, parentID, newTree);
        } else {
            renameIfNewNeighboursHasSimilarName(moveTreeItem, parentID, newTree);
        }

        newTree[index].parent = parentID;
        setTree(newTree);
    } catch(err) {
        console.error('moveFileTo', newTree, parentID);
        console.error(err);
    }
    
    return true;
}