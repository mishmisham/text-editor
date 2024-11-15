

export const pasteFolderItem = async (targetFolder, resetSelectedIfCut=true, contextData) => {
    const {
        cutOrCopyItem,
        setCutOrCopyItem,
        confirmModal,
        resetMouseSelectionsFolderTree,
        openSelectedFolderIfNot,
        setCurrentSelected,
        resetGroupActionSelection,
    } = contextData;

    const {
        tree,
        getTreeItemByID,
        moveTreeItemToFolder,
        pasteCopyOfTreeItem,
        checkForMayCutOrCopyHere,
        getFolderCurrentChildren
    } = contextData.fileContext;

    if (!cutOrCopyItem || !targetFolder || !checkForMayCutOrCopyHere(cutOrCopyItem.item, targetFolder)) {
        return false;
    }

    const {
        groupMode
    } = cutOrCopyItem;

    return new Promise(async(resolve) =>{
        let result = false;

        const targetFolderChildren = getFolderCurrentChildren(targetFolder.id, tree);

        const allPastables = [];

        if (cutOrCopyItem.item.inGroupAction) {
            allPastables.push(...cutOrCopyItem.item.included);
        } else {
            allPastables.push(
                getTreeItemByID(cutOrCopyItem.item.id, tree).item
            );
        }

        let hasSimilarNames = false;

        if (targetFolderChildren) {
            for (let i = 0; i < allPastables.length; i++) {
                const elem = allPastables[i];
                const similarName = targetFolderChildren.find(item => item.name === elem.name);
                if (similarName) {
                    hasSimilarNames = true;
                    break;
                }
            }
        }
        
        let replaceFiles = false;

        if (hasSimilarNames) {
            const { userResponse } = await confirmModal?.current?.openModal({
                text: `Заменять одноименные файлы?`,
            });

            replaceFiles = userResponse;
        }

        if (cutOrCopyItem.mode === 'copy') {
            result = pasteCopyOfTreeItem(allPastables, targetFolder, replaceFiles, cutOrCopyItem.item.excluded);
        }

        if (cutOrCopyItem.mode === 'cut') {
            result = moveTreeItemToFolder(allPastables, targetFolder, replaceFiles, cutOrCopyItem.item.excluded);
        }

        openSelectedFolderIfNot(targetFolder.id);

        if (resetSelectedIfCut) {
            setCutOrCopyItem(null);
        }

        if (result) {
            resetMouseSelectionsFolderTree();
            setCurrentSelected(result.id);
        }

        if (groupMode) {
            resetGroupActionSelection();
        }

        resolve(result);
    })
}