

export const removeFromExcludedActionSelection = (itemList, contextData) =>{
    const {
        excludedFromGroupActionsItems,
        setExcludedFromGroupActionsItems
    } = contextData;
    
    const filtered = [...excludedFromGroupActionsItems].filter(elem=> !itemList.find(item => elem.id === item.id));
    setExcludedFromGroupActionsItems([
        ...filtered
    ]);
}