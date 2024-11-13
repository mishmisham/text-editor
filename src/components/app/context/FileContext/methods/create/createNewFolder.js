import { newFolderTemplate } from '../../jsonTemplates/newFolderTemplate'

export const createNewFolder = (parentFolderID, addToTree=true, contextData) => {
    const {
        tree,
        setTree,
        generateNewUniqueID
    } = contextData;

    const newFolder = newFolderTemplate(parentFolderID, generateNewUniqueID);
    if (addToTree) {
        setTree([
            ...tree,
            newFolder
        ]);
    }

    return newFolder;
}