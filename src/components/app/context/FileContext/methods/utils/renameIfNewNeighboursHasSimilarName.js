

export const renameIfNewNeighboursHasSimilarName = (item, parentID, sourceArray, contextData) => {
    
    const {
        getFolderCurrentChildren
    } = contextData;
    
    const newParentChildrens = getFolderCurrentChildren(parentID, sourceArray);
    if (!newParentChildrens) {
        return;
    }

    const itemNames = newParentChildrens.map(child=>child.id !== item.id ? child.name : null);
   
    const nameUpgrader = (searchName) => {
        if (itemNames.indexOf(searchName) !== -1) {
            const isAlreadyHaveACopy = /_копия_/.test(searchName);
            const searchNamePart = isAlreadyHaveACopy ? 1 + parseInt(searchName.split('_копия_')[0]) : 1;
            const secondPart = isAlreadyHaveACopy ? searchName.split('_копия_').map((part, i)=>i > 0 ? part : '').join('') : searchName;
            const newIterationVariant = `${searchNamePart}_копия_${secondPart}`;
            return nameUpgrader(newIterationVariant);
        }
        return searchName;
    }
    
    item.name = nameUpgrader(item.name);
}