

export const removeFileFromAllViews = (closeFileID, contextData) => {
    const { 
        views,
        setViews,
        closeFileIfCurrentView,
     } = contextData;

    const newViews = [...views];

    newViews.forEach(view => {
        const viewIndex = view.indexOf(closeFileID);
        if (viewIndex !== -1) {
            view.splice(viewIndex, 1);
        }
    });

    setViews(newViews);  
    closeFileIfCurrentView(closeFileID);
}