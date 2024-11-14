

export const pasteFolderItem = async (addItem, targetFolder, resetSelectedIfCut=true, contextData) => {
    const {
        cutOrCopyItem,
        fileContext,
        setCutOrCopyItem,
        confirmModal,
        resetMouseSelectionsFolderTree,
        openSelectedFolderIfNot,
        setCurrentSelected,
    } = contextData;

    const {
        moveTreeItemToFolder,
        pasteCopyOfTreeItem,
        checkForMayCutOrCopyHere
    } = fileContext;

    if (!checkForMayCutOrCopyHere(addItem, targetFolder)) {
        return false;
    }

    return new Promise(async(resolve) =>{
        let result = false;
        const { userResponse } = await confirmModal?.current?.openModal({
            text: `Заменять одноименные файлы?`,
        });

        if (cutOrCopyItem?.mode === 'copy') {
            result = pasteCopyOfTreeItem(addItem, targetFolder, userResponse);
        }

        if (cutOrCopyItem?.mode === 'cut') {
            result = moveTreeItemToFolder(addItem, targetFolder, userResponse);
        }
        
        openSelectedFolderIfNot(targetFolder.id);

        if (resetSelectedIfCut) {
            setCutOrCopyItem(null);
        }

        if (result) {
            resetMouseSelectionsFolderTree();
            setCurrentSelected(result.id);
        }

        resolve(result);
    })
}