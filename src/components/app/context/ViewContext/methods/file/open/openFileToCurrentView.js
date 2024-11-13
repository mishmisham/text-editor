

export const openFileToCurrentView = (openFileID, contextData) => {
    const {
        views,
        currentView,
        setViews,
        setCurrentView,
    } = contextData;
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