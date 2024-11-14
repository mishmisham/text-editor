

export const deleteFolderItem = async (item, contextData) => {
    const {
        onRemoveChildItemsCallback,
        fileContext,
        viewContext,
        confirmModal
    } = contextData;

    const {
        removeFileFromAllViews,
    } = viewContext;

    const {
        deleteTreeItem
    } = fileContext;

    const { userResponse } = await confirmModal?.current?.openModal({
        text: `Удалить ${item.name}?`,
    });

    if(!userResponse) {
        return;
    }

    deleteTreeItem(item.id, (child)=>{
        onRemoveChildItemsCallback(child);
        removeFileFromAllViews(child.item.id);
    });
}