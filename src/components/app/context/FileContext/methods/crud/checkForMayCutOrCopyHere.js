

export const checkForMayCutOrCopyHere = (moveTreeItem, moveTo, allowCopyHere=false, contextData) => {
    if (!moveTreeItem || moveTreeItem.id === moveTo.id) {
        return false;
    }

    const {
        getClosestTreeItemFolder,
        getAllFolderChildren
    } = contextData;

    const parentID = getClosestTreeItemFolder(moveTo);
    if (moveTreeItem.type === 'folder' && parentID) {
        const itemChildren = getAllFolderChildren(moveTreeItem.id);
        const parentIsChild = -1 !== itemChildren.findIndex((child) => child.item.id === parentID);
        if (parentIsChild) {
            return false;
        }
    }
    
    if (!allowCopyHere && parentID === moveTreeItem.parent) {
        return false;
    }

    return true;
}