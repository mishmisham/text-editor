

export const closeFileIfCurrentView = (closeFileID, contextData) => {
    const {
        views,
        currentView,
        setCurrentView
    } = contextData;

    const { view, file } = currentView;

    if (file === closeFileID) {
        const newOpenFileID = views[view].length ? views[view][0] : null;
        
        setCurrentView({
            ...currentView,
            file: newOpenFileID
        });
    }
}