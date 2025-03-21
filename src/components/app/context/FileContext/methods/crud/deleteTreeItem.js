
export const deleteTreeItem = (itemID, eachChildItemCallback = null, sourceArray, onlyUpgradeArray=false, excluded=[], contextData) => {
    
    const {
        setTree,
        getTreeItemByID,
        getAllFolderChildren,
    } = contextData;

    let newTree = [...JSON.parse(JSON.stringify(sourceArray))];
    const list = getAllFolderChildren(itemID, newTree);
    const { index, item } = getTreeItemByID(itemID, newTree);
    list.push({index, item});

    list.forEach(child => {
        if (eachChildItemCallback) {
            eachChildItemCallback(child);
        }

        newTree = [...newTree].filter(file=>file.id !== child.item.id);
    });

    if (!onlyUpgradeArray) {
        setTree(newTree);
    }

    return newTree;
}