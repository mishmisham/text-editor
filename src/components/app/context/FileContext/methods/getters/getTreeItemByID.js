

export const getTreeItemByID = (id, tree) => {
    const index = tree.findIndex(item=>item.id === id);
    return {
        index,
        item: tree[index]
    }
}