

export const openFileToCurrentView = (openFileID, contextData) => {
    const {
        views,
        currentView,
        setViews,
        setCurrentView,
        createNewView
    } = contextData;

    if (!views.length) {
        
        createNewView(true, openFileID);
        return;

    } else if (currentView.view === null) {
        setCurrentView({
            view: views.length - 1,
            file: openFileID
        });
    }

    const currentViewFileIDs = views[currentView.view];

    if (currentViewFileIDs.indexOf(openFileID) === -1) {
        const newViews = [...views];
        newViews[currentView.view].push(openFileID);
        setViews(newViews);
    }

    setCurrentView({
        ...currentView,
        file: openFileID
    });
}