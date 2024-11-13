
export const onRemoveChildItemsCallback = (child, contextData) => {
    const { 
        currentSelected,
        renameID,
        openFolders,
        setCurrentSelected,
        setRenameID,
        setOpenFolders,
    } = contextData;

    if (currentSelected === child.item.id) {
        setCurrentSelected(null);
    }
    if (renameID === child.item.id) {
        setRenameID(null);
    }
    if (openFolders.indexOf(child.item.id)) {
        const newOpenFolders = openFolders.filter(id => id !== child.item.id);
        setOpenFolders(newOpenFolders);
    }
}