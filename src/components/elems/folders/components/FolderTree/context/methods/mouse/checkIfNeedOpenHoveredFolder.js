
export const checkIfNeedOpenHoveredFolder = (id, contextData) => {
    const { mouseOverItem, mouseDownItem } = contextData;

    const notNeed = !mouseOverItem
    || mouseOverItem.id !== id
    || mouseOverItem.type !== 'folder'
    || !mouseDownItem
    || mouseDownItem.id === mouseOverItem.id

    return !notNeed;
}