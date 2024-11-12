

export const searchFileByName = (searchText, contextData) => {
    if (!searchText) {
        return [];
    }

    const {
        tree,
        sortFolderContent
    } = contextData;

    let searchReg = '';
    try {
        searchReg = new RegExp(searchText);
    } catch (err) {
        // searchReg = new RegExp(JSON.stringify(searchText));
        return [];
    }
    
    const found = tree.filter(item => searchReg.test(item.name.toLowerCase()));
    const sortedItems = sortFolderContent(found);
    return sortedItems;
}