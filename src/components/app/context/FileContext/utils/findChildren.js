import { sortFirstIsFolder } from './sortFirstIsFolder';

export const findChildren = (folderID, sourceArray) => {
    const children = sourceArray.filter(item=>item.parent === folderID);

    if (!children.length) {
        return null;
    }

    const sortedChildren = sortFirstIsFolder(children);
    return sortedChildren;
} 