
export const getCurrentSelectedFolder = (contextData) => {

    const {
        currentSelected,
        fileContext,
    } = contextData;

    const {
        getTreeItemByID
    } = fileContext;

    if (!currentSelected) {
        return null;
    }

    const { item } = getTreeItemByID(currentSelected);
    
    if (!item) {
        return null;
    }

    return item.type === 'folder' ? currentSelected : (item.parent ? item.parent : 0);
}