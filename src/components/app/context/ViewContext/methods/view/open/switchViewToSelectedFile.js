

export const switchViewToSelectedFile = (fileID, viewIndex, contextData) => {
    const {
        currentView,
        setCurrentView
    } = contextData;
    
    setCurrentView({
        ...currentView,
        file: fileID,
        view: viewIndex
    })
}