

export const closeFolder = (itemID, contextData) => {
    const {
        openFolders,
        setOpenFolders
    } = contextData;
    
    const newFolderList = [ ...openFolders ]
                                .filter(folderID=>folderID !== itemID);
    setOpenFolders(newFolderList);
}