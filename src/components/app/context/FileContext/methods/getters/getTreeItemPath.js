import { getTreeItemByID } from './getTreeItemByID';

export const getTreeItemPath = (item, sourceArray) => {

    if (!item.parent) {
        return [];
    }

    const finder = (elem, list=[]) => {
        if (!elem.parent) {
            return;
        }

        const parent = getTreeItemByID(elem.parent, sourceArray);
        
        if (!parent.item) {
            return;
        }
        
        list.push(parent.item);
        if (parent.item.parent) { 
            finder(parent.item, list);
        }
    }

    const breadcrumbs = [];
    finder(item, breadcrumbs);

    return breadcrumbs.reverse();
}