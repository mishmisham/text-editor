

export const closeOneView = (viewIndex, contextData) => {
    const {
        views,
        currentView,
        setCurrentView,
        setViews
    } = contextData;
    
    const newViews = [...views];
    newViews.splice(viewIndex, 1);

    if (!newViews.length) {
        newViews.push([]);
    }

    if (currentView.view === viewIndex) {
        setCurrentView({
            ...currentView,
            view: 0,
            file: newViews[0].length ? newViews[0][0] : null,
        });
    }

    setViews(newViews);
}