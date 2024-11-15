

export const getExcludedFromGroupActionsChildren = (item, contextData) => {
    const {
        excludedFromGroupActionsItems
    } = contextData;
    
    const {
        getAllFolderChildren,
        tree,
    } = contextData.fileContext;
    
    const itemChildren = item.type === 'folder' ? getAllFolderChildren(item.id, tree).map(child=>child.item) : [];
    const excludedChildren = itemChildren.filter(child => excludedFromGroupActionsItems.find(elem=>elem.id === child.id));
   
    return excludedChildren;
}