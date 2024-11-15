

export const removeChildrenFromGroupActionsSelection = (item, contextData) => {
    const {
        selectedToGroupActionsItems,
        getChildrenListForRemoveFromGroupActionsSelection,
        setSelectedToGroupActionsItems
    } = contextData;
    const removeFromGroupList = getChildrenListForRemoveFromGroupActionsSelection(item);

    if (!removeFromGroupList) {
        return;
    }

    setSelectedToGroupActionsItems([
        ...selectedToGroupActionsItems
            .filter(elem=> -1 === removeFromGroupList
                .findIndex(child=>elem.id === child.id)),
    ]);

}