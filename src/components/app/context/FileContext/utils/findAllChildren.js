import { getItemByID } from './getItemByID';

export const findAllChildren = (id, sourceArray, list=[]) => {
    const children = sourceArray.filter(item=>item.parent === id);

    let newList = [
        ...list,
        ...children.map(item=> {
            const { index } = getItemByID(item.id, sourceArray);
            return {
                item,
                index
            }
        })
    ];

    children.forEach(item => {
        newList = findAllChildren(item.id, sourceArray, newList);
    })

    return newList;
}