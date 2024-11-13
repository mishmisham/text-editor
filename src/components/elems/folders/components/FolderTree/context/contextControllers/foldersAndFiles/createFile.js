

export const createFile = (parentFolderID, contextData) => {
    const {
        getCurrentSelectedFolder,
        setCurrentSelected,
        setRenameID,
        fileContext,
        openSelectedFolderIfNot,
    } = contextData;

    const {
        createNewFile
    } = fileContext;

    const appendTo = parentFolderID || getCurrentSelectedFolder();
    const newFile = createNewFile(appendTo);

    openSelectedFolderIfNot(appendTo);
    setCurrentSelected(newFile.id);
    setRenameID(newFile.id);

    return newFile;
}