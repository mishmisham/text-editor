import { getTreeItemByID } from './getTreeItemByID';

export const getAllFolderChildren = (id, sourceArray, list=[]) => {
    const children = sourceArray.filter(item=>item.parent === id);

    let newList = [
        ...list,
        ...children.map(item=> {
            const { index } = getTreeItemByID(item.id, sourceArray);
            return {
                item,
                index
            }
        })
    ];

    children.forEach(item => {
        newList = getAllFolderChildren(item.id, sourceArray, newList);
    })

    return newList;
}