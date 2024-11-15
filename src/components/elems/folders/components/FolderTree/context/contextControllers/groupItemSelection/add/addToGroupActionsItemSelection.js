
export const addToGroupActionsItemSelection = (item, contextData) => {
    const { 
        selectedToGroupActionsItems,
        getChildrenListForRemoveFromGroupActionsSelection,
        setSelectedToGroupActionsItems
    } = contextData;
       
    // remove children from selected when parent is selected
    const removeFromGroupList = getChildrenListForRemoveFromGroupActionsSelection(item);

    setSelectedToGroupActionsItems([
        item,
        ...selectedToGroupActionsItems
                .filter(elem=> -1 === removeFromGroupList
                        .findIndex(child=>elem.id === child.id)),
    ]);
}