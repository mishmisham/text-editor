

export const getRecursiveCopyOfAllChildrens = (oldParentID, newParentID, idCompareArray=[], list=[], contextData) => {
    
    const {
        getCopyOfItem,
        findFolderCurrentChildren
    } = contextData;
    
    const originalItemChildren = findFolderCurrentChildren(oldParentID);
    if (!originalItemChildren) {
        return list;
    }

    originalItemChildren.forEach(child => {
        const childCopyItem = getCopyOfItem(child, newParentID, idCompareArray);
        list.push(childCopyItem)
        idCompareArray.push(childCopyItem);
        if (childCopyItem.type === 'folder') {
            getRecursiveCopyOfAllChildrens(child.id, childCopyItem.id, idCompareArray=[], list, contextData);
        }
    });

    return list;
}