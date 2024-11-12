
export const newFolderTemplate = (parent, generateNewUniqueID) => {

    const id = generateNewUniqueID();
    
    return {
        id,
        name: 'new folder',
        type: 'folder',
        parent,
    }
}