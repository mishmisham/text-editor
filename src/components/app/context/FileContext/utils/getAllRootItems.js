

export const getAllRootItems = (contextData) => {
    const { tree, sortFolderContent } = contextData;
    const roots = tree.filter(item => !item.parent);
    const sortedRoots = sortFolderContent(roots);
    return sortedRoots;
}