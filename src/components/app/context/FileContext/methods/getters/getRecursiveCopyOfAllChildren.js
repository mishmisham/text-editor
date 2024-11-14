

export const getRecursiveCopyOfAllChildren = (oldParentID, newParentID, idCompareArray=[], list=[], contextData) => {
    
    const {
        getCopyOfItem,
        getFolderCurrentChildren
    } = contextData;
    
    const originalItemChildren = getFolderCurrentChildren(oldParentID);
    if (!originalItemChildren) {
        return list;
    }

    try {
        originalItemChildren.forEach(child => {
            const childCopyItem = getCopyOfItem(child, newParentID, idCompareArray);
            list.push(childCopyItem)
            idCompareArray.push(childCopyItem);
            if (childCopyItem.type === 'folder') {
                getRecursiveCopyOfAllChildren(child.id, childCopyItem.id, idCompareArray, list, contextData);
            }
        });
    } catch(err) {
        console.log('getRecursiveCopyOfAllChildren', originalItemChildren);
        console.log(err);
    }

    return list;
}