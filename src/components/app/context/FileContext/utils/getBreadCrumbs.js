import { getItemByID } from './getItemByID';

export const getBreadCrumbs = (item, tree) => {
    const breadCrumbs = [];

    const finder = (elem) => {
        if (!elem) {
            return;
        }
        const parent = getItemByID(elem.parent, tree);
        breadCrumbs.push(parent.item);

        if (parent.parent) { 
            finder(parent);
        }
    }

    finder(item);

    return breadCrumbs.reverse();
}