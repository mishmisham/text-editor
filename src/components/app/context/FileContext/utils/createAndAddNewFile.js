

export const createAndAddNewFile = (parentFolderID, contextData) => {
    const {
        tree,
        setTree,
        newFileTemplate,
        generateNewUniqueID
    } = contextData;

    const newFile = newFileTemplate(parentFolderID, generateNewUniqueID);
    setTree([
        ...tree,
        newFile
    ]);

    return newFile;
}