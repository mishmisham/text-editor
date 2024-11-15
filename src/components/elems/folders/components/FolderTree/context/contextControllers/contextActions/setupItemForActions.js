

export const setupItemForActions = (item, contextData) => {
    const {
        selectedToGroupActionsItems,
        excludedFromGroupActionsItems,
        itemIsSelectedToGroupActions,
        mouseOverItem,
        cutOrCopyItem,
    } = contextData;

    const {
        checkForMayCutOrCopyHere
    } = contextData.fileContext;

    const isFolder = item.type === 'folder';
    const mayPasteHere = isFolder && !mouseOverItem && cutOrCopyItem && checkForMayCutOrCopyHere(cutOrCopyItem, item);

    const isSelectedInGroup = undefined !== itemIsSelectedToGroupActions(item, true);
    const groupMode = selectedToGroupActionsItems.length > 0;
    const inGroupAction = groupMode && isSelectedInGroup;
    const notInSelection = !groupMode || !isSelectedInGroup;

    return {
        ...item,
        mayPasteHere,
        isFolder,
        isSelectedInGroup,
        groupMode,
        inGroupAction,
        notInSelection,
        included: [...selectedToGroupActionsItems],
        excluded: [...excludedFromGroupActionsItems]
    };
}