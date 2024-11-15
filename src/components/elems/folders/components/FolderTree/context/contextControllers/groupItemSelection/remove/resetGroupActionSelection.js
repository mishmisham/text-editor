
export const resetGroupActionSelection = (contextData) => {
    const {
        setSelectedToGroupActionsItems,
        setExcludedFromGroupActionsItems
    } = contextData;
    
    setSelectedToGroupActionsItems([]);
    setExcludedFromGroupActionsItems([]);
}