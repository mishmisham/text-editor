import { newFileTemplate } from '../../jsonTemplates/newFileTemplate'

export const createNewFile = (parentFolderID, addToTree=true, contextData) => {
    const {
        tree,
        setTree,
        generateNewUniqueID
    } = contextData;

    const newFile = newFileTemplate(parentFolderID, generateNewUniqueID);

    if (addToTree) {
        setTree([
            ...tree,
            newFile
        ]);
    
    }
    
    return newFile;
}