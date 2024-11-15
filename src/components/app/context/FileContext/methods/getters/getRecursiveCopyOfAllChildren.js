

export const getRecursiveCopyOfAllChildren = (oldParentID, newParentID, idCompareArray=[], excluded=[], list=[], contextData) => {
    
    console.log(excluded)
    const {
        getCopyOfItem,
        getFolderCurrentChildren
    } = contextData;
    
    const originalItemChildren = getFolderCurrentChildren(oldParentID);
    if (!originalItemChildren) {
        return list;
    }

    try {
        originalItemChildren
            .filter(elem => -1 === excluded.findIndex(item=>item.id === elem.id))
            .forEach(child => {
                const childCopyItem = getCopyOfItem(child, newParentID, idCompareArray);
                list.push(childCopyItem)
                idCompareArray.push(childCopyItem);
                if (childCopyItem.type === 'folder') {
                    getRecursiveCopyOfAllChildren(child.id, childCopyItem.id, idCompareArray, excluded, list, contextData);
                }
            });
    } catch(err) {
        console.log('getRecursiveCopyOfAllChildren', originalItemChildren);
        console.log(err);
    }

    return list;
}