
export const isDropFileTarget = (itemID, contextData) => {
    const { mouseDownItem, mouseOverItem } = contextData;
    return mouseDownItem
                && mouseOverItem
                && mouseDownItem.id !== itemID
                && mouseOverItem.id === itemID;
};