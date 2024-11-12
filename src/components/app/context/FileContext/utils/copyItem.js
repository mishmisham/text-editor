

export const copyItem = (item, parentID, idCompareArray, contextData) => {
    const {
        generateNewUniqueID
    } = contextData;
    
    const newItem = JSON.parse(JSON.stringify(item));
    newItem.parent = parentID;
    newItem.id = generateNewUniqueID(idCompareArray);

    return newItem;
}