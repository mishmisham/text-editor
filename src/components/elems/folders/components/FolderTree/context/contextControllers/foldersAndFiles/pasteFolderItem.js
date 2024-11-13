

export const pasteFolderItem = (addItem, targetFolder, replaceMode=false, resetSelectedIfCut=false, contextData) => {
    const {
        cutOrCopyItem,
        fileContext,
        setCutOrCopyItem,
    } = contextData;

    const {
        moveTreeItemToFolder,
        pasteCopyOfTreeItem
    } = fileContext;

    if (cutOrCopyItem.mode === 'copy') {
        pasteCopyOfTreeItem(addItem, targetFolder, replaceMode);
    }

    if (cutOrCopyItem.mode === 'cut') {
        moveTreeItemToFolder(addItem, targetFolder, replaceMode);
    }
    
    if (resetSelectedIfCut && cutOrCopyItem.mode === 'cut') {
        setCutOrCopyItem(null);
    }
}