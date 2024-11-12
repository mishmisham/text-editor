

export const moveFileTo = (moveTreeItem, moveTo, pasteWithReplace, contextData) => {
    const {
        tree,
        setTree,
        checkForMayCutOrCopyHere,
        getClosestTreeItemFolder,
        removeOldCopyOnPasteReplace,
        renameIfNewNeighboursHasSimilarName,
    } = contextData;

    if (!checkForMayCutOrCopyHere(moveTreeItem, moveTo)) {
        return false;
    }

    let newTree = [...tree];
    const index = tree.findIndex(item=>item.id === moveTreeItem.id);
    const parentID = getClosestTreeItemFolder(moveTo);

    if (pasteWithReplace) {
        newTree = removeOldCopyOnPasteReplace(moveTreeItem.name, parentID, newTree);
    } else {
        renameIfNewNeighboursHasSimilarName(moveTreeItem, parentID, newTree);
    }

    newTree[index].parent = parentID;
    setTree(newTree);
    return true;
}