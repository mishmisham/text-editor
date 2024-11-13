
export const cancelRename = (contextData) => {
    const {
        setRenameID,
    } = contextData;
    
    setRenameID(null);
}