export const newFileTemplate = (parent, generateNewUniqueID) => {

    const id = generateNewUniqueID();
    
    return {
        id,
        name: 'new file',
        type: 'file',
        parent,
        content: '',
        contentHistory: [],
        textSettings: {
            commentaries: {},
            highlights: []
        },
    }
}