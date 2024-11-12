
export const deleteItem = (itemID, eachChildItemCallback = null, sourceArray, onlyUpgradeArray=false, contextData) => {
    
    const {
        setTree,
        getTreeItemByID,
        findAllFolderChildren,
    } = contextData;

    let newTree = [...sourceArray];
    const list = findAllFolderChildren(itemID, newTree);
    const { index, item } = getTreeItemByID(itemID, newTree);
    list.push({index, item});

    list.forEach(child => {
        if (eachChildItemCallback) {
            eachChildItemCallback(child);
        }

        newTree = newTree.filter(file=>file.id !== child.item.id);
    });

    if (!onlyUpgradeArray) {
        setTree(newTree);
    }

    return newTree;
}