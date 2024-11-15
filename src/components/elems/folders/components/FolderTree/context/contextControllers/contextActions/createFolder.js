

export const createFolder = (parentFolderID, contextData) => {
    const {
        getCurrentSelectedFolder,
        setCurrentSelected,
        setRenameID,
        fileContext,
        openSelectedFolderIfNot,
    } = contextData;

    const {
        createNewFolder
    } = fileContext;

    const appendTo = parentFolderID || getCurrentSelectedFolder();
    const newFile = createNewFolder(appendTo);

    openSelectedFolderIfNot(appendTo);
    setCurrentSelected(newFile.id);
    setRenameID(newFile.id);

    return newFile;
}