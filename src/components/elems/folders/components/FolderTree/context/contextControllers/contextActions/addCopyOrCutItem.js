

export const addCopyOrCutItem = (item, mode, contextDate) => {

    const {
        setCutOrCopyItem,
        resetGroupActionSelection,
    } = contextDate;

    const {
        groupMode,
        isSelectedInGroup,
        notInSelection,
        inGroupAction
    } = item;

    const notSetSelectionInfo = !groupMode && !isSelectedInGroup  && !notInSelection && !inGroupAction

    setCutOrCopyItem({
        mode,
        item
    });

    if (notInSelection || notSetSelectionInfo) {
        resetGroupActionSelection();
    }
}