import { getTreeItemByID } from './getTreeItemByID';

export const getTreeItemPath = (item, tree) => {
    const breadCrumbs = [];

    const finder = (elem) => {
        if (!elem) {
            return;
        }
        const parent = getTreeItemByID(elem.parent, tree);
        breadCrumbs.push(parent.item);

        if (parent.parent) { 
            finder(parent);
        }
    }

    finder(item);

    return breadCrumbs.reverse();
}