
export const openFolder = (itemID, contextData) => {
    const {
        openFolders,
        setOpenFolders
    } = contextData;
    const newFolderList = [ ...openFolders ]
                                .filter(folderID=>folderID !== itemID);
    newFolderList.push(itemID);
    setOpenFolders(newFolderList);
}