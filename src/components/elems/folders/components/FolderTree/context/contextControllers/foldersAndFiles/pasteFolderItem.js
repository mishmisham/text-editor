

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
        tree,
        moveTreeItemToFolder,
        pasteCopyOfTreeItem,
        checkForMayCutOrCopyHere,
        getFolderCurrentChildren
    } = fileContext;

    if (!checkForMayCutOrCopyHere(addItem, targetFolder)) {
        return false;
    }

    return new Promise(async(resolve) =>{
        let result = false;

        const targetFolderChildren = getFolderCurrentChildren(targetFolder.id, tree);
        const similarName = targetFolderChildren.find(item => item.name === addItem.name);

        let replaceFiles = false;

        if (similarName) {
            const { userResponse } = await confirmModal?.current?.openModal({
                text: `Заменять одноименные файлы?`,
            });

            replaceFiles = userResponse;
        }

        if (cutOrCopyItem?.mode === 'copy') {
            result = pasteCopyOfTreeItem(addItem, targetFolder, replaceFiles);
        }

        if (cutOrCopyItem?.mode === 'cut') {
            result = moveTreeItemToFolder(addItem, targetFolder, replaceFiles);
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