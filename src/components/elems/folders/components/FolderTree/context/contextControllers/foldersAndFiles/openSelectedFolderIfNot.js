

export const openSelectedFolderIfNot = (targetID=null, contextData) => {
    const {
        getCurrentSelectedFolder,
        openFolders,
        setOpenFolders,
    } = contextData;

    const currentFolder = targetID || getCurrentSelectedFolder();
    if (openFolders.indexOf(currentFolder) === -1) {
        setOpenFolders([...openFolders, currentFolder])
    }
}