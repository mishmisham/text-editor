
export const getNewID = (state, arrayToCheck) => {
    const { tree } = state;
    const checkItemsIDIn = arrayToCheck && arrayToCheck.length ? arrayToCheck : tree;

    let id = 0;
    checkItemsIDIn.forEach(item=>{
        if (item.id > id) id = item.id;
    });

    id += 1;

    return id;
}