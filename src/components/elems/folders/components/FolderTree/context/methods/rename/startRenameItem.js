
export const startRenameItem = (itemID, contextData) => {
    const {
        setRenameID,
        setCurrentSelected,
    } = contextData;
    
    setCurrentSelected(itemID);
    setRenameID(itemID);
}