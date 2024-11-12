

export const sortFirstIsFolder = (items) => {
    const sortedByType = items.sort(item=>item.type === 'folder' ? -1 : 1);

    const firstFileIndex = sortedByType.findIndex(item=>item.type === 'file');
    if (firstFileIndex === -1) {
        return sortedByType;
    }

    const folderArray = sortedByType.splice(0, firstFileIndex)

    const sorted = [
        ...folderArray
                .sort((a, b)=>a.name > b.name ? 1 : -1),
        ...sortedByType
                .sort((a, b)=>a.name > b.name ? 1 : -1),
    ];

    return sorted;
}