import { sortFolderContent } from '../utils/sortFolderContent';

export const getFolderCurrentChildren = (folderID, sourceArray) => {
    const children = sourceArray.filter(item=>item.parent === folderID);

    if (!children.length) {
        return null;
    }

    const sortedChildren = sortFolderContent(children);
    return sortedChildren;
} 