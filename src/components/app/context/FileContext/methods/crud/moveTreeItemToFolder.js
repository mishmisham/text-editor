
// принимает как отдельные элементы, так и массив элементов
export const moveTreeItemToFolder = (moveTreeItem, moveTo, pasteWithReplace, excluded=[], contextData) => {
    const {
        tree,
        setTree,
        checkForMayCutOrCopyHere,
        getClosestTreeItemFolder,
        removeOldCopyOnPasteReplace,
        renameIfNewNeighboursHasSimilarName,
    } = contextData;

    // if (!checkForMayCutOrCopyHere(moveTreeItem, moveTo)) {
    //     return false;
    // }

    let newTree = [...JSON.parse(JSON.stringify(tree))];

    const parentID = getClosestTreeItemFolder(moveTo);

    const upgradeTreeWithOneItem = (item, treeValue) => { 

        let upgadableTree = [...treeValue];

        try {
            const index = upgadableTree.findIndex(elem=>elem.id === item.id);

            if (pasteWithReplace) {
                upgadableTree = removeOldCopyOnPasteReplace(item.name, parentID, upgadableTree);
            } else {
                renameIfNewNeighboursHasSimilarName(item, parentID, upgadableTree);
            }

            upgadableTree[index].parent = parentID;

        } catch(err) {
            console.error('moveFileTo', newTree, tree, parentID);
            console.error(err);
        }

        return upgadableTree;
    }
   
    if (Array.isArray(moveTreeItem)) {
        moveTreeItem
            .filter(elem=>-1 === excluded.findIndex(item=>item.id === elem.id))
            .forEach(item => {
                newTree = upgradeTreeWithOneItem(item, newTree);
            });
    } else {
        newTree = upgradeTreeWithOneItem(moveTreeItem, newTree);
    }

    setTree(newTree);
    
    return moveTreeItem;
}