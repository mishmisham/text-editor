

export const getAllRootTreeItems = (contextData) => {
    const { tree, sortFolderContent } = contextData;
    if (!tree) {
        return [];
    }
    const roots = tree.filter(item => !item.parent);
    const sortedRoots = sortFolderContent(roots);
    return sortedRoots;
}