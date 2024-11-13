

export const isOpenFile = (itemID, contextData) => {
    const { views } = contextData;
    if (!views.length) {
        return;
    }
    
    return views.filter(view => {
        return view.indexOf(itemID) !== -1;
    }).length ? true : false;
}