
// принимает как отдельные элементы, так и массив элементов
export const pasteCopyOfTreeItem = (copyTreeItem, copyTo, pasteWithReplace=false, excluded=[], contextData) => {
    const {
        tree,
        setTree,
        getCopyOfItem,
        checkForMayCutOrCopyHere,
        getRecursiveCopyOfAllChildren,
        removeOldCopyOnPasteReplace,
        renameIfNewNeighboursHasSimilarName,
    } = contextData;

    // if (!checkForMayCutOrCopyHere(copyTreeItem, copyTo, true)) {
    //     return false;
    // }

    let newTree = [...JSON.parse(JSON.stringify(tree))];
    let newCopy = Array.isArray(copyTreeItem) ? [] : null;

    const upgradeTreeWithOneItem = (item, treeValue) => {

        let upgadableTree = [...treeValue];

        const newItem = getCopyOfItem(item, copyTo.id, upgadableTree);

        try {
            upgadableTree.push(newItem);

            if (item.type === 'folder') {
                const newItemCopyList = getRecursiveCopyOfAllChildren(item.id, newItem.id, [...upgadableTree], excluded);
                
                upgadableTree = [
                    ...upgadableTree,
                    ...newItemCopyList
                ];
            }

            if (pasteWithReplace) {
                upgadableTree = removeOldCopyOnPasteReplace(newItem, copyTo.id, upgadableTree);
            } else {
                renameIfNewNeighboursHasSimilarName(newItem, copyTo.id, upgadableTree);
            }

        } catch(err) {
            console.log('pasteCopyOfTreeItem', upgadableTree)
            console.log(err)
        }

        return {
            newItem,
            upgadableTree
        };
    }

    if (Array.isArray(copyTreeItem)) {
        copyTreeItem.forEach(item => {
            const res = upgradeTreeWithOneItem(item, newTree);
            newCopy.push(res.newItem);
            newTree = res.upgadableTree;
        });
    } else {
        const res = upgradeTreeWithOneItem(copyTreeItem, newTree);
        newCopy = res.newItem
        newTree = res.upgadableTree
    }


    setTree(newTree);

    return newCopy;
}