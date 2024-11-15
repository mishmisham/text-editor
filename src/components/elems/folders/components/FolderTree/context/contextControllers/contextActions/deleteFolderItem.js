

export const deleteFolderItem = async (item, excluded=[], contextData) => {
    const {
        onRemoveChildItemsCallback,
        confirmModal
    } = contextData;

    const {
        removeFileFromAllViews,
    } = contextData.viewContext;

    const {
        tree,
        deleteTreeItem
    } = contextData.fileContext;

    const { userResponse } = await confirmModal?.current?.openModal({
        text: `Удалить ${item.name}?`,
    });

    if(!userResponse) {
        return;
    }

    deleteTreeItem(item.id, (child)=>{
        onRemoveChildItemsCallback(child);
        removeFileFromAllViews(child.item.id);
    }, tree, false);
}