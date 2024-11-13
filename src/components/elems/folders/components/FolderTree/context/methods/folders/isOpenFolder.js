
export const isOpenFolder = (itemID, contextData) => {
    const { openFolders } = contextData;
    return openFolders.indexOf(itemID) !== -1
};