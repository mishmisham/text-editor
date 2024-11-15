

export const openContextMenu = (item, contextData) => {
    const {
        selectedToGroupActionsItems,
        setCurrentSelected,
        itemIsExcludedFromGroupActions,
        setContextMenuItem,

        setupItemForActions,

    } = contextData;

    if (!selectedToGroupActionsItems.length) {
        setCurrentSelected(item.id);
    }

    if (itemIsExcludedFromGroupActions(item, true)) {
        setContextMenuItem(null);
        return;
    }

    const preparedItem = setupItemForActions(item)

    setContextMenuItem(preparedItem);
}