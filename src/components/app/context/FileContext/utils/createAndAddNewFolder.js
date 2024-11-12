

export const createAndAddNewFolder = (parentFolderID, contextData) => {
    const {
        tree,
        setTree,
        newFolderTemplate,
        generateNewUniqueID
    } = contextData;

    const newFolder = newFolderTemplate(parentFolderID, generateNewUniqueID);
    setTree([
        ...tree,
        newFolder
    ]);

    return newFolder;
}