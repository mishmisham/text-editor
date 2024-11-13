

export const getClosestTreeItemFolder = (item) => {
    if (item.type === 'file') {
        return item.parent;
    } else if (item.type === 'root') {
        return null;
    }
    return item.id;
}