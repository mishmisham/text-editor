
export const renameTreeItem = (itemID, newName, contextData) => {
    const {
        tree,
        getTreeItemByID,
        setTree
    } = contextData;

    const { index } = getTreeItemByID(itemID);
    const newTree = [...tree];
    newTree[index].name = newName;
    setTree(newTree);
}