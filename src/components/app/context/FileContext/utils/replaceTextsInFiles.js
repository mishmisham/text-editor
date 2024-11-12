

export const replaceTextsInFiles = (fileArray, searchText, replaceValue, $contextData) => {
    const {
        tree, setTree
    } = $contextData;

    const newTree = [...tree];
    const searchRegex = new RegExp(searchText, 'gi');
    fileArray.forEach(item => {
        const fileToUpdate = newTree.find(file=>item.file.id === file.id);
        fileToUpdate.content = fileToUpdate.content.replace(searchRegex, replaceValue)
    });

    setTree(newTree);
}
