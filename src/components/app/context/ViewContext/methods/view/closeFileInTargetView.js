

export const closeFileInTargetView = (closeFileID, viewIndex, contextData) => {
    const {
        views,
        closeFileIfCurrentView,
        setViews
    } = contextData;

    const newViews = [...views]
    newViews[viewIndex] = newViews[viewIndex].filter(id=>id !== closeFileID);

    closeFileIfCurrentView(closeFileID);
    setViews(newViews);  
}